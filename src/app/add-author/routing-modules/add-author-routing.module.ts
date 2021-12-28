import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuthorComponent } from '../add-author.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: AddAuthorComponent}
];

@NgModule({
  declarations: [AddAuthorComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAuthorRoutingModule { }
