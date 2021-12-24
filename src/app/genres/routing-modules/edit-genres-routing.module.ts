import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GenresComponent } from '../genres.component';
import { ReactiveFormsModule } from '@angular/forms'; // added ReactiveForms in order to make 
                                                      // <form [formGroup] = "formGenres"> workable
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: GenresComponent}
];

@NgModule({
  declarations: [GenresComponent],       //----------------------GenresComponent - Necessary for *ngFor 
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)], //------CommonModule necessary for ngFor
  exports: [RouterModule]
})
export class EditGenresRoutingModule { }
