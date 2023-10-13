import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ContentControlsRoutingModule } from './content-controls-routing.module';
import { ContentControlsComponent } from './content-controls.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@NgModule({
  declarations: [ContentControlsComponent],
  imports: [
    CommonModule,
    ContentControlsRoutingModule,
    IonicModule,
    FormsModule,
    NgxExtendedPdfViewerModule
  ]
})
export class ContentControlsModule { }
