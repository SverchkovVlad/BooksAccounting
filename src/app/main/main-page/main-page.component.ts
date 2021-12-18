import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Author } from 'src/app/interfaces/author';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { SortingService } from 'src/app/services/sorting.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewInit {

  authors : Author[];
  searchBookName : string;
  pseudoAuthors : Author[];

  constructor(
    private dbOperationsService : DbOperationsService, 
    private sortingService : SortingService) { }


  selectOptionHandler(selectedOptionEvent : Event) {
    let e = <HTMLOptionElement>selectedOptionEvent.target;

    this.sortingService.sort(this.authors, e.value as keyof Author);
  }

  getAuthors() {
    this.dbOperationsService.getAuthors().subscribe(item => {
      this.authors = <Author[]>item;
    })
  }

  deleteAuthor(id: number) {
    this.dbOperationsService.deleteAuthor(id).subscribe(item => {
      this.getAuthors();
      console.log("Element has been deleted!");
    })
  }

  searchBook() {

    if (this.searchBookName != "") {
      this.authors = this.authors.filter(author => {
        //console.log(author.name.toLocaleLowerCase().match(this.searchBookName.toLocaleLowerCase()));
        // return author.name.toLocaleLowerCase().match(this.searchBookName.toLocaleLowerCase());

        // console.log(author.booksList.filter(book => {
        //   return book.toLocaleLowerCase().match(this.searchBookName.toLocaleLowerCase());
        // }));

        if(author.booksList.some(book => 
          book.toLocaleLowerCase().match(this.searchBookName.toLocaleLowerCase()))) 
        {
          return true;
        }
        else return false;

        // author.booksList.forEach((element, index, array) => {
          
        // });



        // let a : any;

        // for (let i = 0; i < author.booksList.length; i++) {
        //   a = author.booksList[i].toLocaleLowerCase().match(this.searchBookName.toLocaleLowerCase());
        //   if (a == true) return true;
        // }

        

        // return author.booksList.filter(book => {
          
        //   return book.toLocaleLowerCase().match(this.searchBookName.toLocaleLowerCase());
        // })
        
      })
    }
    else {
      this.ngOnInit();
    }
    
  }

  showPseudoAuthors() {
    console.log(this.pseudoAuthors);
  }
  func() {

  }

  ngOnInit(): void {
    this.getAuthors();
  }

  ngAfterViewInit(): void {
    //for manipulations with @ViewChild and @ViewChildren after View initializing is completed
    
  }
}
