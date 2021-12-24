import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Genre } from '../interfaces/genre';
import { DbOperationsService } from '../services/db-operations.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  formGenresGroup : FormGroup = new FormGroup({});
  genres : Genre[];

  constructor(
    private dbOperationsService : DbOperationsService,
    private fBuilder : FormBuilder) { }

    addGenre(inputText : string) {
      this.dbOperationsService.setGenres(inputText).subscribe(genre => {
        this.genres.push(<Genre>genre);
      })
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

  ngOnInit(): void {
    this.getGenres();

    this.formGenresGroup = this.fBuilder.group({
      genre : this.fBuilder.control('', [Validators.minLength(4), Validators.pattern('^[a-zA-Z]+$')])
    });

  }

}
