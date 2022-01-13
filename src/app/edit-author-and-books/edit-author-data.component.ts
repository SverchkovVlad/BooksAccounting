import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../interfaces/author';
import { Genre } from '../interfaces/genre';
import { DbOperationsService } from '../services/db-operations.service';

@Component({
  selector: 'app-edit-author-data',
  templateUrl: './edit-author-data.component.html',
  styleUrls: ['./edit-author-data.component.css']
})
export class EditAuthorDataComponent implements OnInit {

  specificAuthor : Author | undefined;
  allAuthors : Author[];
  genres : Genre[];

  constructor(
    private activatedRoute : ActivatedRoute,
    private dbOperationsService : DbOperationsService) { }

  configurePage() {
    let idAuthor: number = 0;
    this.activatedRoute.params.forEach(param => idAuthor = param['id-author']);
    //idAuthor = this.activatedRoute.snapshot.paramMap.get('id-author');

    this.dbOperationsService.getAuthors().subscribe(author => { 
      this.specificAuthor = (<Author[]>author).find(author => author.id == idAuthor) || undefined;
    });
   
  }

  ngOnInit(): void {
    this.configurePage();
  }

}
