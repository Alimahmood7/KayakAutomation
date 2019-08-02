import { ALIASES } from './constants';
export const idPrefix = ( attrVal : string, childVal ? : string) : string =>
 `[id$=${attrVal}]${childVal ? childVal : ''}`;
export const getElementById = ( selector : string, childSelector ? : string) : Cypress.Chainable =>
 cy.get(idPrefix(selector, childSelector));
export const visitUrl = () : void => { cy.visit(ALIASES.KAYAK_URL); };

export function flightAssertion ( travellersContent : string) : void {
    getElementById('origin-airport-display-inner').first().should('contain.text', ALIASES.ORIGIN_SELECTION);
    getElementById('destination-airport-display-inner').should('contain.text', ALIASES.DESTINATION_SELECTION)
    getElementById('travelers-dialog-trigger', ' div.js-label').first().should('contain.text', travellersContent)
    getElementById('depart-input').invoke('text').should('eq', ALIASES.DEPARTURE_DATE);
    getElementById('return-input').invoke('text').should('eq', ALIASES.ARRIVAL_DATE);
}
export function handleSelectTraveler (
    adultsNumber : number,
    childNumber : number,
    adultIncrButton : Cypress.Chainable,
    travellerIncrButton : Cypress.Chainable ) : void {
    for (let i = 0; i < adultsNumber; i++) {
        adultIncrButton.click();
    }
    for (let i = 0; i < childNumber; i++) {
        travellerIncrButton.click();
    }
}

export function getTabsPrices () : IPrice {
    const cheapestPrice : number =
    parseFloat(cy.$$(`${idPrefix('price_aTab')}`).find('span.js-price').text().replace('$', '').trim());
    const bestPrice : number =
    parseFloat(cy.$$(`${idPrefix('bestflight_aTab')}`).find('span.js-price').text().replace('$', '').trim());
    const quickPrice : number =
    parseFloat(cy.$$(`${idPrefix('duration_aTab')}`).find('span.js-price').text().replace('$', '').trim());
    return { cheapestPrice, bestPrice, quickPrice };
}

export interface IPrice {
    cheapestPrice : number;
    bestPrice : number;
    quickPrice : number;
}
