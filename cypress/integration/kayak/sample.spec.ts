import { getElementById, visitUrl } from './../shared/utils';
import { ALIASES } from '../shared/constants';

/// <reference types="cypress"/>
describe('Kayyak  App ', () => {
   describe('user',  () => {
      before(() => {
         visitUrl();
      });
      it('should select round trip as a default option from the dropdown ',  () => {
         getElementById('RTOWsearchform').first().should('have.class', ALIASES.ROUND_TRIP);
      });
      it('should click one way option from the dropdown ', () => {
         getElementById('switch-display').first().click();
         getElementById('switch-list-wrapper', ' ul li:nth-child(2)').first().click();
         getElementById('RTOWsearchform').first().should('have.class', ALIASES.ONE_WAY);
      });
      it('should click two way option from the dropdown ',  () => {
         getElementById('switch-display').first().click();
         getElementById('switch-list-wrapper', ' ul li:last-child').first().click();
         getElementById('multi-fields', ' >div').should('have.length.greaterThan', ALIASES.SEARCH_DIV_LENGTH);
      });
   });


   describe('user',  () => {
      const adultForm  = 'travelersAboveForm-adults';
      const adultInput  = 'travelersAboveForm-adults-input';
      const errorMessage  = 'travelersAboveForm-errorMessage';
      before(() => {
         visitUrl();
         getElementById('travelersAboveForm-dialog-trigger').first().click();
      });
      it('should select increment adults', () => {
         getElementById(adultForm).find('button[title=Increment]').first().click()
         getElementById(adultInput).first().should('contain.value', ALIASES.ADULT_INCREMENT_VALUE);
      });
      it('should select decrement adults',  () => {
         getElementById(adultForm).first().find('button[title=Decrement]').click();
         getElementById(adultInput).first().should('contain.value', ALIASES.ADULT_DECREMENT_VALUE);
      });
      it('should dislay error when no person is', () => {
         getElementById(adultForm).first().find('button[title=Decrement]').click().click();
         getElementById(errorMessage)
         .should('be.visible')
         .should('contain.text', ALIASES.DISPLAY_TRAVELER_ERROR_Message);
      });
      it('should select not select more than 9 person',  () => {
         getElementById(adultForm).first().find('button[title=Increment]')
         .click().click().click().click().click().click().click().click().click();
         getElementById(errorMessage).first()
         .should('be.visible')
         .should('contain.text', ALIASES.DISPLAY_TRAVELER_EXCEED_ERROR_Message);
      });
   });

   describe('user',  () => {
      before( () => {
         visitUrl();
      });
      it('should enter into city field',  () => {
         getElementById('origin-airport-display').first().click();
         getElementById('origin-airport').first().clear().type('new');
         getElementById('origin-airport-smartbox-dropdown', ' ul li:nth-child(2)').click();
         getElementById('origin-airport-display-inner').first().should('contain.text', ALIASES.ORIGIN_CITY);
      });
   });

});
