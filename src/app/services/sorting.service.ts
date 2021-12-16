import { Injectable } from '@angular/core';
import { Author } from '../interfaces/author';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }

  arrayOfHighlightenedColumns : any = [];

  sort(authorsData : Author[], sortKey: string) {

    //let count = this.clojureFunction();
    //let fucn = this.funcTest(authorsData, sortKey as keyof Author);

    switch (sortKey) {

      case 'name':
      case 'surname': 
      case 'patronymic': {
        this.sortAuthorsBy_Name_Surname_Patronymic(authorsData, sortKey);
        this.highlightSortedKeyColumns(authorsData, sortKey);
        // console.log(count());
        // console.log(count());
        //console.log(fucn());
        //console.log(fucn());
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

      return firstObject[key] > secondObject[key] ? 1 : firstObject[key] < secondObject[key] ? -1 : 0;

      // if (firstObject[key] < secondObject[key]) return -1;
      // else if (firstObject[key] > secondObject[key]) return 1;
      // else return 0;

    });
  }

  highlightSortedKeyColumns(data : Author[], key : keyof Author) : NodeListOf<Element> {

    const sortedDataColumns = document.querySelectorAll('.' + key);

    this.arrayOfHighlightenedColumns.push(sortedDataColumns);

    if (this.arrayOfHighlightenedColumns.length > 1) {
    
      for (let el in this.arrayOfHighlightenedColumns) {

        for (let el of this.arrayOfHighlightenedColumns[0]) {
          el.removeAttribute("style");
        }
        this.arrayOfHighlightenedColumns.splice(0, el);
      }
      
    }

    for (let element of sortedDataColumns) {
      element.setAttribute("style", "background-color: lightgreen;");
    }

    console.log(this.arrayOfHighlightenedColumns);
    return sortedDataColumns;

  }

  // clojureFunction() {

  //     let current = 0;
  //     return function () {
  //       current++;
  //       return current;
  //     }
    
  // };

  // funcTest(data: Author[], key : keyof Author) {

  //   let arr : any = [];
  //   let sortedDataColumns = document.querySelectorAll('.' + key);

  //   return function() {

  //     for (let element of sortedDataColumns) {
  //       arr.push(element.setAttribute("style", "background-color: lightgreen;"));
  //     }

  //     for (let arrEl of arr) {
  //       console.dir(arrEl);
  //     }

  //     return arr;
  //   }
  // }

  sortAuthorsByBirth() {

  }

  sortAuthorsByBooksAmount() {

  }

}
