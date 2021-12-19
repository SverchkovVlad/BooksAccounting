import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Author } from 'src/app/interfaces/author';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ItemSearchService } from 'src/app/services/item-search.service';
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
    private sortingService : SortingService,
    private itemSearchService : ItemSearchService) { }


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
     this.authors = this.itemSearchService.searchBook(this.authors, this.searchBookName);
    }
    else {
      this.ngOnInit();
    }
    
  }

  ngOnInit(): void {
    this.getAuthors();
  }

  ngAfterViewInit(): void {
    //for manipulations with @ViewChild and @ViewChildren after View initializing is completed
    
  }
}
