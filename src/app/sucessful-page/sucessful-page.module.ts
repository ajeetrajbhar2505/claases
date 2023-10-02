import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SucessfulPageRoutingModule } from './sucessful-page-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';


@NgModule({
  declarations: [],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SucessfulPageRoutingModule
  ]
})
export class SucessfulPageModule { }
