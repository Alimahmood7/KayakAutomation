/// <reference types="cypress"/>
export const ALIASES : IAlias = {
    ONE_WAY: 'oneway',
    ROUND_TRIP: 'roundtrip',
    DISPLAY_TRAVELER_ERROR_Message: 'Searches need at least 1 traveler',
    DISPLAY_TRAVELER_EXCEED_ERROR_Message: 'Searches cannot have more than 9 adults',
    ORIGIN_CITY: 'New York (JFK)',
    SEARCH_DIV_LENGTH: 1,
    ADULT_INCREMENT_VALUE: '2',
    ORIGIN_SELECTION: 'Karaganda (KGF)',
    DESTINATION_SELECTION: 'Paris (CDG)',
    ADULT_DECREMENT_VALUE: '1',
    KAYAK_URL: 'https://www.kayak.com',
    DEPARTURE_DATE: 'Mon 8/5',
    ARRIVAL_DATE: 'Mon 8/12',
    SEARCH_FLIGHT_URL : '/flights',
};
interface IAlias {
    ONE_WAY : string;
    ROUND_TRIP : string;
    DISPLAY_TRAVELER_ERROR_Message : string;
    DISPLAY_TRAVELER_EXCEED_ERROR_Message : string;
    ORIGIN_CITY : string;
    SEARCH_DIV_LENGTH : number;
    ADULT_INCREMENT_VALUE : string;
    ADULT_DECREMENT_VALUE : string;
    KAYAK_URL : string;
    ORIGIN_SELECTION : string;
    DESTINATION_SELECTION : string;
    DEPARTURE_DATE : string;
    ARRIVAL_DATE : string;
    SEARCH_FLIGHT_URL : string;
}

export interface IFlight {
    originInput : string;
    originShortName : string;
    originSelection : string;
    destinationInput : string;
    destinationSelection : string;
    passengers : IPassenger;
    Departure : string;
    Arrival : string;
}
export interface IPassenger {
    adults : number;
    seniors : number;
    youth : number;
    child : number;
    seatInfant : number;
    lapInfant : number;
}
