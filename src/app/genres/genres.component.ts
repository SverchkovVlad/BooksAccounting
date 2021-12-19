import { Component, OnInit } from '@angular/core';
import { Genre } from '../interfaces/genre';
import { DbOperationsService } from '../services/db-operations.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  genres : Genre[];

  constructor(
    private dbOperationsService : DbOperationsService
  ) { }

  getGenres() {
    this.dbOperationsService.getGenres().subscribe(item => {
      this.genres = <Genre[]>item;
    })
  }

  deleteGenre(id: number) {
    this.dbOperationsService.deleteGenre(id).subscribe(item => {
      this.getGenres();
    });
  }

  ngOnInit(): void {
    this.getGenres();
  }

}
