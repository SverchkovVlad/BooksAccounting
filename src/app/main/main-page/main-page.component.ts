import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { map } from 'rxjs';
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
  tableVariable : any;
  pseudoAuthors : Author[];
  authorId: number;
  isBookFound: boolean;
  isTableEmpty: boolean;

  constructor(
    private dbOperationsService : DbOperationsService, 
    private sortingService : SortingService,
    private itemSearchService : ItemSearchService,
    private router : Router) { }


  selectOptionHandler(selectedOptionEvent : Event) {
    let e = <HTMLOptionElement>selectedOptionEvent.target;

    this.sortingService.sort(this.authors, e.value as keyof Author);
  }

  getAuthors() {
    this.dbOperationsService.getAuthors().subscribe(item => {
      this.authors = <Author[]>item;
      
      if (this.authors) this.isTableEmpty = false;
    })
  }

  deleteAuthor(id: number) {
    this.dbOperationsService.deleteAuthor(id).subscribe(item => {
      this.getAuthors();
    })
  }

  searchBook() {

    console.log(this.tableVariable);

    if (this.searchBookName != "") {
     this.authors = this.itemSearchService.searchBook(this.authors, this.searchBookName);

     if (this.authors.length == 0) {
       this.isBookFound = true;
     }
     
    }
    else {
      this.ngOnInit();
      this.isBookFound = false;
    }
    
  }

  checkTableEmptiness() {
    let table = document.querySelector('table') as HTMLTableElement;

    if (table.rows.length == 1 && !this.isTableEmpty) {
      this.isTableEmpty = true;
    }

  }

  authorIdHandler(id: any) {

    //this.router.navigate(['editAuthorData', id]);
    this.router.navigate(['addAuthor', id]);
    
    // выбрать конкретного автора на основании полученного id
    // let specificAuthor = this.authors.find(author => author.id == id);
    // if (specificAuthor) console.log(specificAuthor.id);

  }

  ngOnInit(): void {
    this.getAuthors();
    this.checkTableEmptiness();
  }

  ngAfterViewInit(): void {
    //for manipulations with @ViewChild and @ViewChildren after View initializing is completed
    
  }
}
