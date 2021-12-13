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

    let arrayID_Value : Array<[number, string | number | Date]> = [];
    //let arrayID_Value = [];
    sortType = "name";

    for(let i = 0, len = authorsData.length; i < len; i++) {

      arrayID_Value.push([ authorsData[i].id, authorsData[i][sortType] ]);
      //arrayID_Value[i].push(authorsData[i].name);
      //console.log(authorsData[i]);


        // console.log(authorsData[i].sortType) ????? 
        
    }

    for (let el of arrayID_Value) {
      console.log(el);
    }

  }

  // sortAuthorsByName(id: any[], name: any[]) {

  // }

  sortAuthorsByName(data : any) {

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
