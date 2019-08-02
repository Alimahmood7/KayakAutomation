import { ALIASES, IFlight, IPassenger } from '../shared/constants';
import { getElementById, visitUrl, flightAssertion, handleSelectTraveler, getTabsPrices } from '../shared/utils';

/// <reference types="cypress"/>

describe('kayak', () => {
   describe('user', () => {
      let travellersContent = '';
      before(() => {
         visitUrl();
      });
      beforeEach(() => {
         cy.fixture('/flights.json').as('flight');
      });
      // tslint:disable-next-line: typedef
      it('fetch the data from json file and select the origin dropdown', function () {
         // tslint:disable-next-line: no-invalid-this
         const { originInput, originSelection } = this.flight;
         getElementById('origin-airport-display').first().click();
         getElementById('origin-airport').first().clear().type(originInput);
         cy.wait(2000);
         getElementById('origin-airport-smartbox-dropdown', ' ul li div.item-info >div')
            .contains(originSelection).click();
         getElementById('origin-airport-display-inner').first().should('contain.text', ALIASES.ORIGIN_SELECTION);
      });
      // tslint:disable-next-line: typedef
      it('fetch the data from json file and select the destination dropdown', function () {
         // tslint:disable-next-line: no-invalid-this
         const { destinationInput, destinationSelection } = this.flight as IFlight;
         getElementById('destination-airport-display').first().click();
         getElementById('destination-airport').first().clear().type(destinationInput);
         cy.wait(2000);
         getElementById('destination-airport-smartbox-dropdown', ' ul li div.item-info>div')
            .contains(destinationSelection).click();
         getElementById('destination-airport-display-inner').should('contain.text', ALIASES.DESTINATION_SELECTION)
      });
      // tslint:disable-next-line: typedef
      it('fetch the data and select the tarveler', function () {
         getElementById('travelersAboveForm-dialog-trigger').click();
         // tslint:disable-next-line: no-invalid-this
         const { adults: adultsNumber, child: childNumber } = this.flight.passengers as IPassenger;
         const sum = adultsNumber + childNumber;
         travellersContent = `${sum + 1} Travelers`;
         const adultIncrButton = getElementById('travelersAboveForm-adults').find('button[title=Increment]');
         const travellerIncrButton = getElementById('travelersAboveForm-child').find('button[title=Increment]');
         handleSelectTraveler(adultsNumber, childNumber, adultIncrButton, travellerIncrButton);
         cy.get('.title').first().click();
         getElementById('travelersAboveForm-dialog-trigger', ' div.js-label')
            .first().should('contain.text', travellersContent);
      });
      // tslint:disable-next-line: typedef
      it('set departure date', function () {
         // tslint:disable-next-line: no-invalid-this
         const { Departure } = this.flight as IFlight;
         const depDate = Cypress.moment(Departure).format('MMM M/D');
         getElementById('dateRangeInput-display-start-inner').first().click();
         getElementById('depart-input').click().clear().type(depDate).type('{enter}');
         getElementById('depart-input').invoke('text').should('eq', ALIASES.DEPARTURE_DATE);
      });
      // tslint:disable-next-line: typedef
      it('set arrival date', function () {
         // tslint:disable-next-line: no-invalid-this
         const { Arrival } = this.flight as IFlight;
         const arrDate = Cypress.moment(Arrival).format('MMM M/D');
         getElementById('dateRangeInput-display-end').first().click();
         getElementById('return-input').click().clear().type(arrDate).type('{enter}');
         getElementById('return-input').invoke('text').should('eq', ALIASES.ARRIVAL_DATE);
      });
      it('should submit the flight', () => {
         getElementById('compareTo-noneLink').first().click();
         getElementById('col-button-wrapper', ' > button').click();
         assertionVerification();
      });
      function assertionVerification(): void {
         cy.url().should('include', ALIASES.SEARCH_FLIGHT_URL);
         cy.wait(10000);
         getElementById('tabs').should('be.visible').then(() => {
            const { cheapestPrice, bestPrice, quickPrice } = getTabsPrices();
            // tslint:disable-next-line: no-unused-expression
            expect((cheapestPrice <= bestPrice) && (cheapestPrice <= quickPrice)).to.be.true;
            flightAssertion(travellersContent);
         });
      }
   });


});
