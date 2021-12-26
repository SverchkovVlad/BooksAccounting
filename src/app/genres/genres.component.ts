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
  selectedGenre : Genre;

  constructor(
    private dbOperationsService: DbOperationsService,
    private fBuilder: FormBuilder) { }

  addGenre(inputText: string) {
    if (inputText) {
      this.dbOperationsService.setGenres(inputText).subscribe(genre => {
        this.genres.push(<Genre>genre);
      });

      this.clearInputField();
      this.showInfo('info', inputText, 'add');
    }
    else {
      this.showEmptyError();
    }

  }

  getGenres() {
    this.dbOperationsService.getGenres().subscribe(item => {
      this.genres = <Genre[]>item;
    })
  }

  startEditGenre(genre: Genre, input: HTMLInputElement) {
    this.selectedGenre = genre;
    input.value = genre.name;
  }

  finishEditGenre(newName : string) {
    this.selectedGenre.name = newName;

    this.dbOperationsService.editGenre(this.selectedGenre).subscribe();
    this.clearInputField();
    this.showInfo('info', newName, 'edit');
  }

  deleteGenre(id: number) {
    this.dbOperationsService.deleteGenre(id).subscribe(item => {
      this.getGenres();
    })
  }

  showEmptyError() {
    let elementEmptyError = document.querySelector('.empty') as HTMLElement;
    elementEmptyError.style.display = "block";
    window.setTimeout(this.hideElement, 2000, elementEmptyError);
  }

  showInfo(cssClass: string, inputText: string, typeOfMessage: string) {
    let element = document.querySelector('.blank') as HTMLElement;
    element.classList.add(cssClass);

    switch (typeOfMessage) {
      case 'add': 
        element.innerHTML = "You have successfully added genre <b>" + inputText + "</b>";
        break;
      case 'edit': 
        element.innerHTML = "New name of selected genre is <b>" + inputText + "</b>";
        break;
    }
    
    element.style.display = "block";

    window.setTimeout(this.hideElement, 2000, element);
  }

  hideElement(element : HTMLDivElement) {
    element.style.display = "none";
  }

  clearInputField() {
    let input = document.querySelector('.main-input') as HTMLInputElement;
    if (input) input.value = "";
  }

  ngOnInit(): void {
    this.getGenres();

    this.formGenresGroup = this.fBuilder.group({
      genre: this.fBuilder.control('', [Validators.minLength(4), Validators.pattern('^[a-zA-Z ]+$')])
    });

  }
}
