import { FlightModel, RootStoreModel } from '../data-models/flight-models';
import { Action } from '@ngrx/store';
import { SetFlightListAction } from '../store/flight-search.action';

const initialState = new RootStoreModel();

export function flightReducer(state: RootStoreModel = initialState, action: Action): RootStoreModel {
  switch (action.type) {
    case 'SET_FLIGHT_LIST':
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      const setFlightAction = <SetFlightListAction> action;
      console.log('flight reducer says : ', setFlightAction.flights);
      return{
        ...state,
        flights: setFlightAction.flights
      };
    default:
      return state;
  }
}
