import { NgModule } from "@angular/core";
import { FSToolComponent } from './components/fs-tool';
import { FSToolContainerComponent } from './container/fs-tool-container.component';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
      CommonModule
    ],
    exports: [
      FSToolComponent,
      FSToolContainerComponent
    ],
    declarations: [
      FSToolComponent,
      FSToolContainerComponent
    ],
    providers: [],
    bootstrap: []
  })
  export class FSToolModule { }
