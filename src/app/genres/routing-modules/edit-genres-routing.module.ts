import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GenresComponent } from '../genres.component';

const routes: Routes = [
  {path: '', component: GenresComponent}
];

@NgModule({
  declarations: [GenresComponent],       //----------------------Necessary for *ngFor 
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditGenresRoutingModule { }
