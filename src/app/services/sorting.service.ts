import { Injectable } from '@angular/core';
import { Author } from '../interfaces/author';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }

  sort(authorsData : Author[], sortType: string) {

    let specificSortedData;

    switch (sortType) {

      case 'name': {
        specificSortedData = this.selectSpecificData(authorsData, sortType);
        //this.sortAuthorsByName(specificSortedData);
        break;
      }
      case 'surname': {
        this.sortAuthorsBySurname();
        break;
      }
      case 'patronymic': {
        this.sortAuthorsByPatronymic();
        break;
      }
      case 'birth': {
        this.sortAuthorsByBirth();
        break;
      }
      case 'books': {
        this.sortAuthorsByBooksAmount();
      }

    }
  }

  selectSpecificData(authorsData : Author[], sortType: keyof Author) {

    let newObjectList : Array< {id: number, value : string | number | Date | string[] }> = [];

    newObjectList = authorsData.map(function(data) {
      return {id: data.id, value: data[sortType] };
    });

    console.log(newObjectList);

    for (let el of newObjectList) {
      console.log(el);
    }

  }

  sortAuthorsByName(data : [number, string | number | Date | string[]][]) {

  }

  sortAuthorsBySurname() {

  }

  sortAuthorsByPatronymic() {

  }

  sortAuthorsByBirth() {

  }

  sortAuthorsByBooksAmount() {

  }

}
