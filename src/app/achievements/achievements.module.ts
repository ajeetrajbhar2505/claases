import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AchievementsRoutingModule } from './achievements-routing.module';
import { AchievementsComponent } from './achievements.component';


@NgModule({
  declarations: [AchievementsComponent],
  imports: [
    CommonModule,
    AchievementsRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class AchievementsModule { }
