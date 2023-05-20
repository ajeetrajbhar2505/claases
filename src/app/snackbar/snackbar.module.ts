import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SnackbarRoutingModule } from './snackbar-routing.module';
import { SnackbarComponent } from './snackbar.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SnackbarRoutingModule,
    IonicModule
  ]
})
export class SnackbarModule { }
