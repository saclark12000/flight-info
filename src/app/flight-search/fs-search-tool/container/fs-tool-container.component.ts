import { Component, ChangeDetectionStrategy, OnInit, Output } from '@angular/core';
import { SetFlightListAction } from '../../store/flight-search.action';
import { Store } from '@ngrx/store';
import { FlightModel, RootStoreModel } from '../../data-models/flight-models';
import { Observable } from 'rxjs';
import { getFlights } from '../../store/flight-search-selector';

@Component({
  selector: 'fs-tool-container',
  template: `<fs-tool
                [flights]="flights | async"
                [testObs]="testObs">
            </fs-tool>
            Hello from fs-tools-container`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FSToolContainerComponent implements OnInit {

  monthName: Observable<string>;
  flights: Observable< Array<FlightModel> >;

  testObs: string;

  // allFlights: Observable<models.RootStoreModel>;

  flightTypes = [
    () => [ 0, 1, 2, 3, 4, 5, 6 ] ,
    () => [ 1, 3, 5],
    () => [ this.getRandom(7) ]
  ];
  amPm = [ 'AM', 'PM' ];
  startDate = new Date(2020, 0, 6);
  aircraftTypes = [ 'Airbus 123', 'Boeing 737', 'Boeing 747', 'DC 10' ];
  cities = [ 'St. Louis', 'Chicago', 'New York', 'Los Angeles', 'Miami' ];

  // Array.prototype.flat = function() {
  //   return this.reduce((acc, arr) => [ ...acc, ...arr], []);
  // }

  constructor(private store: Store<RootStoreModel>) {}

  ngOnInit() {
    const populateFlights = this.createFlights();
    this.store.dispatch(new SetFlightListAction(populateFlights));
    this.flights = this.store.select(getFlights);
  }

  addDays(days) {
      const d = new Date();
      d.setDate(this.startDate.getDate() + days);
      return d;
    }

  getRandom(max, rounding?) {
      const round = rounding || Math.floor;
      return round(Math.random() * max);
    }

  assignTimes(flight, num) {
    // tslint:disable-next-line: curly
    if (num === 0) return [];
    const d  = flight.flightDate;
    const [ year, month, day] = [ 1900 + d.getYear(), d.getMonth(), d.getDate()];
    return [
      { ... flight,
      flightNumber: 100 + this.getRandom(200),
      flightDate: new Date( year, month, day, this.getRandom(24, Math.ceil) )
      },
      ...this.assignTimes(flight, num - 1)
    ];
  }

  createFlights() {
    let flights = [];
    const sched = this.flightTypes[this.getRandom(this.flightTypes.length)]();
    for (let week = 0; week < 52; ++week) {
        sched.forEach(x => {
            let cityTarget = this.createDestination();
            flights = [ ...flights, {
                departure: this.cities[cityTarget[0]],
                arrival: this.cities[cityTarget[1]],
                flightDate: this.addDays(week * 7 + x),
                seatAvailable: this.getRandom(20),
                aircraft: this.aircraftTypes[this.getRandom(this.aircraftTypes.length)],
                price: 100 + this.getRandom(200),
                stops: this.getRandom(3),
            }];
        });
    }
    return flights.reduce((acc, fli) => [ ...acc, ...this.assignTimes(fli, this.getRandom(3, Math.ceil)) ], []);
  }

  createDestination() {
    const departure = this.getRandom(this.cities.length);
    let arrival = this.getRandom(this.cities.length);
    while (arrival === departure) {
      arrival = this.getRandom(this.cities.length);
    }
    return [departure, arrival];
  }
}
