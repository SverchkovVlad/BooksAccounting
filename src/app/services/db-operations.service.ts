import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../interfaces/author';

@Injectable({
  providedIn: 'root'
})
export class DbOperationsService {

  constructor(private http : HttpClient) { }

  getAuthors() {
    return this.http.get('http://localhost:3000/authors');
  }

  deleteAuthor(id: number) {
    return this.http.delete(`http://localhost:3000/authors/${id}`);
  }

  getGenres() {
    return this.http.get('http://localhost:3000/genres');
  }

  deleteGenre(id: number) {
    return this.http.delete(`http://localhost:3000/authors/${id}`);
  }
}
