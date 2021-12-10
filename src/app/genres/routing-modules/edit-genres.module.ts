import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditGenresRoutingModule } from './edit-genres-routing.module';
import { GenresComponent } from '../genres.component';


@NgModule({
  declarations: [
    GenresComponent
  ],
  imports: [
    CommonModule,
    EditGenresRoutingModule
  ]
})
export class EditGenresModule { }
