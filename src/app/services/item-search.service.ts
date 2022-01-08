import { Injectable } from '@angular/core';
import { Author } from '../interfaces/author';

@Injectable({
  providedIn: 'root'
})

export class ItemSearchService {

  constructor() { }

  searchBook(authorsData : Author[], inputElement : string) {
    
    authorsData = authorsData.filter(author => {
      return author.books.some(book => 
        book.bookName.toLocaleLowerCase().match(inputElement.toLocaleLowerCase())) ? true : false;
    });

    return authorsData;
  }

}
