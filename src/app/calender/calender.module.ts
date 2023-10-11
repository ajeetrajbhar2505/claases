import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalenderRoutingModule } from './calender-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ContentControlsRoutingModule } from '../content-controls/content-controls-routing.module';
import { CalenderComponent } from './calender.component';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [CalenderComponent],
  imports: [
    CommonModule,
    CalenderRoutingModule,
    ContentControlsRoutingModule,
    IonicModule,
    FormsModule,
    FullCalendarModule
  ]
})
export class CalenderModule { }