import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';


@NgModule({
  declarations: [QuizComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class QuizModule { }
