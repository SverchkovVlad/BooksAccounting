import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Author } from '../interfaces/author';
import { Genre } from '../interfaces/genre';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }

  arrayOfHighlightenedColumns : NodeListOf<Element>[] = [];

  sort(authorsData : Author[], key : keyof Author) {
    this.sortAuthorsByKey(authorsData, key);
    this.highlightSortedKeyColumns(key);
  }

  sortAuthorsByKey(data : Author[], key : keyof Author) {
    return data.sort(function(firstObject, secondObject) {

      if (key == "birthDate") {

        let firstEl = firstObject.birthDate.toString().split('/').reverse().join();
        let secondEl = secondObject.birthDate.toString().split('/').reverse().join();

        return firstEl < secondEl ? -1 : firstEl > secondEl ? 1 : 0;
      }

      else if (key == "books") {
        return secondObject.books.length - firstObject.books.length;
      }

      else {
        return firstObject[key] > secondObject[key] ? 1 : firstObject[key] < secondObject[key] ? -1 : 0;
      
        // if (firstObject[key] < secondObject[key]) return -1;
        // else if (firstObject[key] > secondObject[key]) return 1;
        // else return 0;
      
      }

    });
  }

  sortGenres(genres: Genre[]) {
    return genres.sort(function(firstObject, secondObject) {
      return firstObject.name > secondObject.name ? 1 : firstObject.name < secondObject.name ? -1 : 0;
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

}
