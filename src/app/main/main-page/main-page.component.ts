import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/interfaces/author';
import { DbOperationsService } from 'src/app/services/db-operations.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  authors : Author[];

  constructor(private dbOperationsService : DbOperationsService) { }

  getAuthors() {
    this.dbOperationsService.getAuthors().subscribe(item => {
      this.authors = <Author[]>item;
      console.log(this.authors);
    })
  }

  deleteAuthor(id: number) {
    this.dbOperationsService.deleteAuthor(id).subscribe(item => {
      this.getAuthors();
      console.log("Element has been deleted!");
    })
  }

  ngOnInit(): void {
    this.getAuthors();
  }

}
