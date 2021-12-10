import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAuthorRoutingModule } from './add-author-routing.module';
import { AddAuthorComponent } from './add-author.component';


@NgModule({
  declarations: [
    AddAuthorComponent
  ],
  imports: [
    CommonModule,
    AddAuthorRoutingModule
  ]
})
export class AddAuthorModule { }
