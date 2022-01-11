import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
  authorId: number;

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
    })
  }

  deleteAuthor(id: number) {
    this.dbOperationsService.deleteAuthor(id).subscribe(item => {
      this.getAuthors();
      console.log("Element has been deleted!");
    })
  }

  searchBook() {

    let errorElement = document.querySelector('.book-not-found') as HTMLDivElement;

    if (this.searchBookName != "") {
     this.authors = this.itemSearchService.searchBook(this.authors, this.searchBookName);

     if (this.authors.length == 0) {
       if (errorElement) errorElement.style.display = "block";
     }
     
    }
    else {
      this.ngOnInit();
      if (errorElement) errorElement.style.display = "none";
    }
    
  }

  authorIdHandler(id: any) {

    this.router.navigate(['editAuthorData', id]);
    
    // выбрать конкретного автора на основании полученного id
    // let specificAuthor = this.authors.find(author => author.id == id);
    // if (specificAuthor) console.log(specificAuthor.id);

  }

  ngOnInit(): void {
    this.getAuthors();
  }

  ngAfterViewInit(): void {
    //for manipulations with @ViewChild and @ViewChildren after View initializing is completed
    
  }
}
