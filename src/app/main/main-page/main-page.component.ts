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
      console.log(item);
      this.authors = <Author[]>item;
      console.log(typeof this.authors); 
    })
  }

  ngOnInit(): void {
    this.getAuthors();
  }

}
