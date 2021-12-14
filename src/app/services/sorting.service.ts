import { Injectable } from '@angular/core';
import { Author } from '../interfaces/author';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }

  sort(authorsData : Author[], sortKey: string) {

    switch (sortKey) {

      case 'name':
      case 'surname': 
      case 'patronymic': {
        this.sortAuthorsBy_Name_Surname_Patronymic(authorsData, sortKey);
        break;
      }
      case 'birthDate': {
        this.sortAuthorsByBirth();
        break;
      }
      case 'books': {
        this.sortAuthorsByBooksAmount();
      }

    }
  }

  sortAuthorsBy_Name_Surname_Patronymic(data : Author[], key : keyof Author) {
    return data.sort(function(firstObject, secondObject) {
      if (firstObject[key] < secondObject[key]) {
        return -1;
      }
      else if (firstObject[key] > secondObject[key]) {
        return 1;
      }
      else {
        return 0;
      }
    });
  }

  sortAuthorsByBirth() {

  }

  sortAuthorsByBooksAmount() {

  }

}
