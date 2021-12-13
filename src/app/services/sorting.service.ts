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
        /* test function with property */
        this.selectSpecificDataFromObject(authorsData, sortType);
        this.sortAuthorsByName(specificSortedData);
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

    let array_ID_Value : Array<[number, string | number | Date | string[]]> = [];

    //let array_ID_Value : [number, string | number | Date][] = []; ----equally


    for(let i = 0, len = authorsData.length; i < len; i++) {
      array_ID_Value.push([ authorsData[i].id, authorsData[i][sortType] ]);
    }

    for (let el of array_ID_Value) {
      console.log(el);
    }

    return array_ID_Value;

  }

  selectSpecificDataFromObject(authorsData : Author[], sortType: keyof Author) {

    let newObjectList : any = [];

    for (let i = 0, len = authorsData.length; i < len; i++) {
      newObjectList.push( { id: authorsData[i].id, sortType : authorsData[i][sortType] } );
    }
    
    console.log(newObjectList);

    // for (let el of newObjectList) {
    //   console.log(el.id + " " + el.sortType);
    // }

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
