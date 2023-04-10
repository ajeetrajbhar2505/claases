import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { LiveRoutingModule } from './live-routing.module';
import { LiveComponent } from './live.component';


@NgModule({
  declarations: [LiveComponent],
  imports: [
    CommonModule,
    LiveRoutingModule,
    IonicModule,
    FormsModule,
    ExploreContainerComponentModule,
    PdfViewerModule
  ]
})
export class LiveModule { }
