import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Genre } from '../interfaces/genre';
import { DbOperationsService } from '../services/db-operations.service';
import { ShowMessageService } from '../services/show-message.service';

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
    private fBuilder: FormBuilder,
    private showMessageService: ShowMessageService) { }

  addGenre(inputText: string) {
    if (inputText) {
      this.dbOperationsService.setGenres(inputText).subscribe(genre => {
        this.genres.push(<Genre>genre);
      });

      this.clearInputField();
      this.showMessageService.showInfo('info', inputText, 'add');
    }
    else {
      this.showMessageService.showInfo('main-input-error', '', 'error-empty');
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

    if (newName) {
      this.selectedGenre.name = newName;

      this.dbOperationsService.editGenre(this.selectedGenre).subscribe();
      this.clearInputField();
      this.showMessageService.showInfo('info', newName, 'edit');
    }
    else {
      this.showMessageService.showInfo('main-input-error', '', 'error-empty');
    }
   
  }

  deleteGenre(id: number) {
    this.dbOperationsService.deleteGenre(id).subscribe(item => {
      this.getGenres();
    })
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
