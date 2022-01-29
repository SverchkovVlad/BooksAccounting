import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/app/interfaces/author';
import { DbOperationsService } from 'src/app/services/db-operations.service';
import { ItemSearchService } from 'src/app/services/item-search.service';
import { SortingService } from 'src/app/services/sorting.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  authors: Author[];
  searchBookName: string;
  tableVariable: any;
  pseudoAuthors: Author[];
  authorId: number;
  isBookFound: boolean;
  isTableEmpty: boolean;
  tableAuthor: Author;
  trBooks: Author['books'];

  constructor(
    private dbOperationsService: DbOperationsService,
    private sortingService: SortingService,
    private itemSearchService: ItemSearchService,
    private router: Router,
    private datePipe : DatePipe) { }


  selectOptionHandler(selectedOptionEvent: Event) {
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
    this.router.navigate(['addAuthor', id]);
  }

  openModalWindow(authorID: number) {
    document.body.style.overflow = "hidden";

    let elementModal = document.querySelector('.modal-wrapper') as HTMLDivElement;
    elementModal.style.display = "block";

    this.dbOperationsService.getAuthor(authorID).subscribe((data) => {
      let author = <Author>data;

      if (author) {

        this.convertDate(author.birthDate);

        this.tableAuthor = author;
        this.trBooks = author.books;
      }

    })
  }

  convertDate(date: Date) {
    let paragraphDate = document.querySelector('.modal-date-of-birth');

    let inputDate = date.toString().split('/');
    let newDate = [inputDate[1], inputDate[0], inputDate[2]].join('/');

    if (paragraphDate) paragraphDate.innerHTML = 'Date of birth: ' + <string>this.datePipe.transform(newDate, 'longDate');
  }

  closeModalWindow() {
    document.body.style.overflow = "auto";

    let elementModal = document.querySelector('.modal-wrapper') as HTMLDivElement;
    elementModal.style.display = "none";
  }

  toggle(event : any) {
    if (event.target.className === 'modal-window') {
      this.closeModalWindow();
    }
  }

  ngOnInit(): void {
    this.getAuthors();
    this.checkTableEmptiness();

  }

}
