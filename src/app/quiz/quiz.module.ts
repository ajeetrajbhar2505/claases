import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';


@NgModule({
  declarations: [QuizComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    IonicModule,
    FormsModule,
    ExploreContainerComponentModule
  ]
})
export class QuizModule { }
