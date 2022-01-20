import { Component, OnInit } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

import { Author } from '../interfaces/author';
import { Genre } from '../interfaces/genre';
import { DbOperationsService } from '../services/db-operations.service';
import { ShowMessageService } from '../services/show-message.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  formAddAuthor: FormGroup = new FormGroup({});
  books: FormArray = new FormArray([]);
  genres: Genre[];
  genreValue: string;
  //authors: Author[];
  specificAuthorID: number;
  specificAuthor: Author;
  isEditing: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dbOperationService: DbOperationsService,
    private fb: FormBuilder,
    private showMessageService: ShowMessageService
    ) { }

  getGenres() {
    this.dbOperationService.getGenres().subscribe({
      next: (genre) => this.genres = <Genre[]>genre,
      error: (error) => {
        console.log(error);
        return this.showMessageService.showInfo('error-class', '', 'error-blank', undefined, 'Can`t load genres! Details in console')
      }
    })
  }

  createFormElements() {

    //original regexp: ^[a-zA-Z,.-` ]+$ - problems with numbers
    this.formAddAuthor = this.fb.group({
      name: this.fb.control('', [Validators.pattern('[^ ][a-zA-Z,.` -]+$'), Validators.required]),
      surname: this.fb.control('', [Validators.pattern('[^ ][a-zA-Z,.` -]+$'), Validators.required]),
      patronymic: this.fb.control('', [Validators.pattern('[^ ][a-zA-Z,.` -]+$'), Validators.required]),
      birthDate: this.fb.control('', [Validators.required,
      Validators.pattern(/^(([0][1-9])|([1-2][0-9])|([3][0-1]))\/(([0][1-9])|([1][0-2]))\/([0-9]{4})$/)]),
      // Input format: 16/03/1965
      books: this.fb.array([this.createBook()])
    });

  }

  createBook(): FormGroup {

    return this.fb.group({
      //Validators.pattern('^[-a-zA-Z,.`?&*%#()<> ]+$')
      bookName: this.fb.control('', [Validators.pattern('[^ ](.*)'), Validators.required]), //not allowed first char as whitespace, but then - everything you want 
      bookPagesNum: this.fb.control(<number>1,
        [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]\d*$/)]),
      bookGenre: this.fb.control(this.genreValue, Validators.required)
    });

  }

  addBook() {
    //this.books = this.formAddAuthor.get('books') as FormArray;
    this.books.push(this.createBook());
  }

  deleteBook(index: number) {
    this.books.removeAt(index);
  }

  submitData(form: FormGroup) {

    let authorsData = form.value;

    if (form.valid && form.status == "VALID" && !this.isEditing) {

      for (let element of authorsData.books) {
        element.bookPagesNum = +element.bookPagesNum; // converting numPages to number
      }

      this.dbOperationService.setAuthor(authorsData).subscribe((response) => {

        if (response.status == 201) {
          this.showMessageService.showInfo('success-add-author-class', '', 'add-author');
        }
        else {
          this.showMessageService.showInfo('error-class', '', 'error-status-code', response.status);
        }

        //this.authors.push(authorsData);
        
      });

      //this.showMessageService.showInfo('success-add-author-class', '', '');

    }

    else if (form.valid && form.status == "VALID" && this.isEditing) {

      for (let element of authorsData.books) {
        element.bookPagesNum = +element.bookPagesNum; // converting numPages to number
      }

      this.dbOperationService.editAuthor(authorsData, this.specificAuthorID).subscribe((response) => {

        if (response.status == 200) {
          this.showMessageService.showInfo('success-add-author-class', '', 'edit-author');
        }
        else {
          this.showMessageService.showInfo('error-class', '', 'error-status-code', response.status);
        }
      });

    }

    else {
      alert("Error!");
    }
  }

  editingConfigurationForm(idAuthor: number): void {
    //let idAuthor: number = 0;
    //this.activatedRoute.params.forEach(param => idAuthor = param['id-author']);
    //idAuthor = this.activatedRoute.snapshot.paramMap.get('id-author');

    this.dbOperationService.getAuthor(idAuthor).subscribe(author => {
      this.specificAuthor = <Author>author; 

      if (this.specificAuthor) {
        this.fillForm_authorsData(this.specificAuthor);
      }
    });

  }


  fillForm_authorsData(author: Author): void {

    this.formAddAuthor.patchValue({
      name: author.name,
      surname: author.surname,
      patronymic: author.patronymic,
      birthDate: author.birthDate
    });

    author.books.forEach((element, index, array) => {
      if (index === array.length - 1) return;
      else {
        this.addBook();
      }

    });

    setTimeout(this.fillAuthorBooks, 0, this.specificAuthor, this.books);
    //this.fillAuthorBooks(this.specificAuthor!, this.books, this.formAddAuthor);

  }

  fillAuthorBooks(author: Author, books: FormArray) {

    for (let i = 0; i < books.length; i++) { //booksFormArray
      books.controls[i].patchValue({ //booksFormArray
        bookName: author.books[i].bookName,
        bookPagesNum: author.books[i].bookPagesNum,
        bookGenre: author.books[i].bookGenre
      });
    }

  }

  ngOnInit(): void {
    this.getGenres();
    this.createFormElements();

    this.books = <FormArray>this.formAddAuthor.get('books');

    if (this.activatedRoute.snapshot.paramMap.get('id-author')) {
      this.isEditing = true;
      this.specificAuthorID = +this.activatedRoute.snapshot.paramMap.get('id-author')!;
      //this.activatedRoute.params.forEach(param => this.specificAuthorID = param['id-author']);
      
      this.editingConfigurationForm(this.specificAuthorID);
    }

  }

}
