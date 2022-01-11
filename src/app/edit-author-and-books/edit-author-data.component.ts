import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private dbOperationsService : DbOperationsService) { }

    getAuthors() {
      this.dbOperationsService.getAuthors().subscribe(author => { 
     
        //this.specificAuthor = (<Author[]>author).find(author => author.id == idAuthor) || undefined;
        this.allAuthors = <Author[]>author;
      });
    }

    getGenres() {
      this.dbOperationsService.getGenres().subscribe(genre => {
        this.genres = <Genre[]>genre;
        console.log(this.genres);
      })
      
    }

  configurePage() {
    let idAuthor: number = 0;
    this.activatedRoute.params.forEach(param => idAuthor = param['id-author']);
    //idAuthor = this.activatedRoute.snapshot.paramMap.get('id-author');

    this.dbOperationsService.getAuthors().subscribe(author => { 
     
      this.specificAuthor = (<Author[]>author).find(author => author.id == idAuthor) || undefined;
      console.log(this.specificAuthor);
      //this.allAuthors = <Author[]>author;
    });
   

    //this.specificAuthor = this.allAuthors.find(author => {author.id == +idAuthor})

    //console.log(this.specificAuthor);
  }

  ngOnInit(): void {
    this.getAuthors();
    this.getGenres();
    this.configurePage();
    
  }

}
