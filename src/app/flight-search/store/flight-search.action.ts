import { Action } from '@ngrx/store';
import { FlightModel } from '../data-models/flight-models';

export class SetFlightListAction implements Action {
  readonly type = 'SET_FLIGHT_LIST';
  constructor(public flights: FlightModel[]) { console.log('from action: ', flights) }
}
