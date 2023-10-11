import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms'
import { TabsPageRoutingModule } from './tabs-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { TabsPage } from './tabs.page';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FullCalendarModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
