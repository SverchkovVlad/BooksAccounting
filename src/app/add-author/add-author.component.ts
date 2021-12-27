import { Component, OnInit } from '@angular/core';
import { Genre } from '../interfaces/genre';
import { DbOperationsService } from '../services/db-operations.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  genres : Genre[];

  constructor(
    private dbOperationService : DbOperationsService) { }

    getGenres() {
      this.dbOperationService.getGenres().subscribe(genre => {
        this.genres = <Genre[]>genre;
      })
    }

  ngOnInit(): void {
    this.getGenres();
  }

}
