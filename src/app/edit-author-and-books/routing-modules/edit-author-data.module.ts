import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditAuthorDataRoutingModule } from './edit-author-data-routing.module';
import { EditAuthorDataComponent } from '../edit-author-data.component';


@NgModule({
  declarations: [
    EditAuthorDataComponent
  ],
  imports: [
    CommonModule,
    EditAuthorDataRoutingModule
  ]
})
export class EditAuthorDataModule { }
