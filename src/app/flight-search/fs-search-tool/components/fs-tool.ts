import { OnInit, Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { FlightModel } from '../../data-models/flight-models';

@Component({
  selector: 'fs-tool',
  templateUrl: './fs-tool.html',
  styleUrls: ['./fs-tool.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FSToolComponent implements OnInit {

  @Input() flights: Array<FlightModel>; // RootStoreModel = new RootStoreModel();
  @Input() testObs: string;

  @Output() getFlightsEmitter: EventEmitter<any> = new EventEmitter();

  flightArray: Array<FlightModel>;

  ngOnInit() {
    this.flightArray = this.flights['flights'];
  }

}
