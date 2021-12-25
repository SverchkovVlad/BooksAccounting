import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Genre } from '../interfaces/genre';
import { DbOperationsService } from '../services/db-operations.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  formGenresGroup: FormGroup = new FormGroup({});
  genres: Genre[];

  constructor(
    private dbOperationsService: DbOperationsService,
    private fBuilder: FormBuilder) { }

  addGenre(inputText: string) {
    if (inputText) {
      this.dbOperationsService.setGenres(inputText).subscribe(genre => {
        this.genres.push(<Genre>genre);
      })
    }
    else {
      this.showEmptyError();
    }

  }

  showEmptyError() {
    let elementEmptyError = document.querySelector('.empty') as HTMLElement;
    elementEmptyError.style.display = "block";
    window.setTimeout(this.hideEmptyError, 2000, elementEmptyError);
  }

  hideEmptyError(element : HTMLDivElement) {
    element.style.display = "none";
  }

  getGenres() {
    this.dbOperationsService.getGenres().subscribe(item => {
      this.genres = <Genre[]>item;
    })
  }

  deleteGenre(id: number) {
    this.dbOperationsService.deleteGenre(id).subscribe(item => {
      this.getGenres();
    })
  }

  // checkInput(inputValue : string) {
  //   if (!inputValue) {
  //     this.boolInputEmpty = true;
  //   }
  //   else {
  //     this.boolInputEmpty = false;
  //   }
  // }

  ngOnInit(): void {
    this.getGenres();

    this.formGenresGroup = this.fBuilder.group({
      genre: this.fBuilder.control('', [Validators.nullValidator, Validators.minLength(4), Validators.pattern('^[a-zA-Z]+$')])
    });

  }
}
