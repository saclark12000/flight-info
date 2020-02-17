export class FlightModel {
  departure?: string; // departure city
  arrival?: string; // arrival city
  flightDate?: Date; // departure date time
  seatsAvailable?: number; // # seats available for purchase on the flight
  aircraft?: string; // type of plane
  price?: number; // price of the flight
  stops?: number; // stops on the flight
}

export class RootStoreModel {
  flights: Array<FlightModel>;
}
