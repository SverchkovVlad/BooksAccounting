import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from '../genres.component';

const routes: Routes = [
  {path: '', component: GenresComponent}
];

@NgModule({
  declarations: [GenresComponent],         //--------------------Genres COmponent should be added
  imports: [CommonModule, RouterModule.forChild(routes)], //-----------COmmonModule should be added (*ngFor problem)
  exports: [RouterModule]
})
export class EditGenresRoutingModule { }
