import { createSelector } from '@ngrx/store';
import { FlightModel, RootStoreModel } from '../data-models/flight-models';

export const getRootStoreModel = function (state: RootStoreModel) {
  return state ? state : new RootStoreModel();
};

export const getFlights = createSelector(getRootStoreModel, (store: RootStoreModel) => {
  return store.flights ? store.flights : new Array<FlightModel>()
});
