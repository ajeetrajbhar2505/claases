import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SucessfulPageComponent } from './sucessful-page.component';

const routes: Routes = [
  {path : '',component : SucessfulPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucessfulPageRoutingModule { }
