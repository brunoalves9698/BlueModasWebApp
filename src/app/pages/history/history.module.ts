import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';

import { SharedComponentsModule } from 'src/app/components/shared/shared-components.module';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedComponentsModule
  ]
})
export class HistoryModule { }
