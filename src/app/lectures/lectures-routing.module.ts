import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LecturesComponent } from './lectures.component';

const routes: Routes = [
  { path : '',component : LecturesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LecturesRoutingModule { }
