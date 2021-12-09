import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
