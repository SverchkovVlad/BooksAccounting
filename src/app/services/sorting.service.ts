import { Injectable } from '@angular/core';
import { Author } from '../interfaces/author';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }

  arrayOfHighlightenedColumns : NodeListOf<Element>[] = [];

  sort(authorsData : Author[], sortKey: string) {

    switch (sortKey) {

      case 'name':
      case 'surname': 
      case 'patronymic':
      case 'birthDate': {
        this.sortAuthorsBy_Name_Surname_Patronymic(authorsData, sortKey);
        this.highlightSortedKeyColumns(sortKey);
        break;
      }
      case 'books': {
        this.sortAuthorsByBooksAmount();
      }

    }
  }

  sortAuthorsBy_Name_Surname_Patronymic(data : Author[], key : keyof Author) {
    return data.sort(function(firstObject, secondObject) {

      if (key == "birthDate") {
        return +new Date(firstObject.birthDate) - +new Date(secondObject.birthDate);
      }

      else {
        return firstObject[key] > secondObject[key] ? 1 : firstObject[key] < secondObject[key] ? -1 : 0;
      
        // if (firstObject[key] < secondObject[key]) return -1;
        // else if (firstObject[key] > secondObject[key]) return 1;
        // else return 0;
      
      }

    });
  }

  highlightSortedKeyColumns(key : keyof Author) : NodeListOf<Element> {

    const sortedDataColumns = document.querySelectorAll('.' + key);

    this.arrayOfHighlightenedColumns.push(sortedDataColumns);

    if (this.arrayOfHighlightenedColumns.length > 1) {
      this.arrayOfHighlightenedColumns[0].forEach((element : Element) => element.removeAttribute("style"));
      this.arrayOfHighlightenedColumns.splice(0, 1);
    }

    sortedDataColumns.forEach((element : Element) => element.setAttribute("style", "background-color: lightgreen;"))
    
    return sortedDataColumns;

  }

  sortAuthorsByBooksAmount() {

  }

}
