import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EditAuthorDataComponent } from '../edit-author-data.component';

const routes: Routes = [
  {path: '', component: EditAuthorDataComponent}
];

@NgModule({
  declarations: [EditAuthorDataComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditAuthorDataRoutingModule { }
