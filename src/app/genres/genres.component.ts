import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Author } from '../interfaces/author';
import { Genre } from '../interfaces/genre';
import { DbOperationsService } from '../services/db-operations.service';
import { ShowMessageService } from '../services/show-message.service';
import { SortingService } from '../services/sorting.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  formGenresGroup: FormGroup = new FormGroup({});
  genres: Genre[];
  selectedGenre: Genre;
  authors: Author[];
  genreID: number;

  constructor(
    private dbOperationsService: DbOperationsService,
    private fBuilder: FormBuilder,
    private showMessageService: ShowMessageService,
    private sortService: SortingService) { }

  addGenre(inputText: string) {
    if (inputText) {

      let genresFirstLength = this.genres.length;

      this.dbOperationsService.setGenre(inputText).subscribe((genre) => {
        this.genres.push(<Genre>genre);

        if (genresFirstLength < this.genres.length) {
          this.clearInputField();
          this.showMessageService.showInfo('info', inputText, 'add');
        }

      });

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

  finishEditGenre(newName: string) {

    if (newName) {
      this.selectedGenre.name = newName;

      this.dbOperationsService.editGenre(this.selectedGenre).subscribe(response => {
        if (response.status == 200) {
          this.showMessageService.showInfo('info', newName, 'edit');
          this.clearInputField();
        }
      });

    }
    else {
      this.showMessageService.showInfo('main-input-error', '', 'error-empty');
    }

  }

  deleteGenre(id: number) {

    this.dbOperationsService.deleteGenre(id).subscribe(() => {
      this.getGenres();
    })
  }

  checkGenreUsing(genreName: string, genreId: number) {

    this.dbOperationsService.getAuthors().pipe(
      map(authors => (<Author[]>authors).find((author: Author) => {
        return author.books.find((genre: Author['books'][0]) => genre.bookGenre == genreName);
      }))
    ).subscribe(authorWithSpecifiedGenre => {

      if (authorWithSpecifiedGenre) {

        let element = document.querySelector('[id=' + CSS.escape(genreId.toString()) + ']');

        if (element) {
  
          this.genreID = genreId;
          setTimeout(() => {
            this.genreID = 0;
          }, 4000);

        }
        
      }
      else 
        this.deleteGenre(genreId);

    });

  }

  clearInputField() {
    let input = document.querySelector('.main-input') as HTMLInputElement;
    if (input) input.value = "";
  }

  sortGenres() {
    this.sortService.sortGenres(this.genres);
  }

  ngOnInit(): void {
    this.getGenres();

    this.formGenresGroup = this.fBuilder.group({
      genre: this.fBuilder.control('', [Validators.minLength(4), Validators.pattern('^[a-zA-Z ]+$')])
    });

  }
}
