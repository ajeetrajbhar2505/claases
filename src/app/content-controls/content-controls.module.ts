import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { ContentControlsRoutingModule } from './content-controls-routing.module';
import { ContentControlsComponent } from './content-controls.component';


@NgModule({
  declarations: [ContentControlsComponent],
  imports: [
    CommonModule,
    ContentControlsRoutingModule,
    IonicModule,
    FormsModule,
    PdfViewerModule
  ]
})
export class ContentControlsModule { }
