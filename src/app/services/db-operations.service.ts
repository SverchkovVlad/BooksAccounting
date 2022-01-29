import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Observable, throwError as observableThrowError } from 'rxjs';

import { Author } from '../interfaces/author';
import { Genre } from '../interfaces/genre';
import { ShowMessageService } from '../services/show-message.service';

@Injectable({
  providedIn: 'root'
})
export class DbOperationsService {

  constructor(private http : HttpClient, private showMessageService : ShowMessageService) { }

  getAuthors() {
    return this.http.get('http://localhost:3000/authors').pipe(
      catchError(this.handleError)
    )
  }

  deleteAuthor(id: number) {
    return this.http.delete(`http://localhost:3000/authors/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  setAuthor(authorData: Author) {
    return this.http.post(`http://localhost:3000/authors/`, 
      {name : authorData.name,
       surname: authorData.surname,
       patronymic: authorData.patronymic,
       birthDate: authorData.birthDate,
       books: authorData.books}, {observe: 'response'});
  }

  editAuthor(author: Author, authorID : number) {
  
    return this.http.put(`http://localhost:3000/authors/${authorID}`, author, {observe: 'response'})
    .pipe(
      catchError(this.handleError)
    );
  
  }

  getAuthor(id: number) : Observable<Author | unknown>{
    return this.getAuthors().pipe(
      map(authors => (<Author[]>authors).find((author: Author) => author.id == id)),
      catchError(error => {
        console.log(error);
        this.showMessageService.showInfo('error-class', '', 'error-blank', undefined, 'Can`t load requested author! Details in console');
        return error;
        
      })
    );
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return throwError(() => new Error(res || 'Server error'));
  }


  /* Methods for genres */

  setGenre(inputText : string) {
    return this.http.post(`http://localhost:3000/genres`, {name : inputText}).pipe(
      catchError(this.handleError)
    );
  }

  getGenres() {
    return this.http.get('http://localhost:3000/genres').pipe(
      catchError(this.handleError)
    );
  }

  deleteGenre(id: number) {
    return this.http.delete(`http://localhost:3000/genres/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  editGenre(genre: Genre) {
    return this.http.put(`http://localhost:3000/genres/${genre.id}`, genre, {observe: 'response'}).pipe(
      catchError(this.handleError)
    );
  }
  
}
