import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ClassRoutingModule } from './class-routing.module';
import { ClassComponent } from './class.component';


@NgModule({
  declarations: [ClassComponent],
  imports: [
    CommonModule,
    ClassRoutingModule,
    IonicModule,
    FormsModule,
    ExploreContainerComponentModule
  ]
})
export class ClassModule { }
