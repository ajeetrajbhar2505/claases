import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ContentsRoutingModule } from './contents-routing.module';
import { ContentsComponent } from './contents.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [ContentsComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ExploreContainerComponentModule,
    ContentsRoutingModule,
    PdfViewerModule
  ]
})
export class ContentsModule { }
