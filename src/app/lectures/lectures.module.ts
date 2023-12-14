import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LecturesRoutingModule } from './lectures-routing.module';
import { LecturesComponent } from './lectures.component';


@NgModule({
  declarations: [LecturesComponent],
  imports: [
    CommonModule,
    LecturesRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule
  ]
})
export class LecturesModule { }
