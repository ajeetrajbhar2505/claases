import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentControlsComponent } from './content-controls.component';

const routes: Routes = [
  {path : '',component  : ContentControlsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentControlsRoutingModule { }
