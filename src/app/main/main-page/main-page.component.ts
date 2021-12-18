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
  selectOption : HTMLCollectionOf<HTMLOptionElement>;
  selectElement : HTMLSelectElement;

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

  ngOnInit(): void {
    this.getAuthors();
  }

  ngAfterViewInit(): void {
    //for manipulations with @ViewChild and @ViewChildren after View initializing is completed
    
  }
}
