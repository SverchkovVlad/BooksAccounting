import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genre } from '../interfaces/genre';
import { DbOperationsService } from '../services/db-operations.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  formAddAuthor: FormGroup = new FormGroup({});
  genres: Genre[];

  constructor(
    private dbOperationService: DbOperationsService,
    private fBuilder : FormBuilder) { }

  getGenres() {
    this.dbOperationService.getGenres().subscribe(genre => {
      this.genres = <Genre[]>genre;
    })
  }

  createFormElements() {
    this.formAddAuthor = this.fBuilder.group({
      name : this.fBuilder.control('', [Validators.pattern('^[a-zA-Z]+$'), Validators.required]),
      surname : this.fBuilder.control('', [Validators.pattern('^[a-zA-Z]+$'), Validators.required]),
      patronymic : this.fBuilder.control('', [Validators.pattern('^[a-zA-Z]+$'), Validators.required]),
      dateOfBirth : this.fBuilder.control('', [Validators.required, 
        Validators.pattern(/^(([0][1-9])|([1-2][0-9])|([3][0-1]))\/(([0][1-9])|([1][0-2]))\/([0-9]{4})$/)])
        // Input format: 16/03/1965
    });
  }

  ngOnInit(): void {
    this.getGenres();
    this.createFormElements();
  }

}
