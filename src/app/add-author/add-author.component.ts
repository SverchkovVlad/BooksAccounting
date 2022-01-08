import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  authors: Author[];

  constructor(
    private dbOperationService: DbOperationsService,
    private fb: FormBuilder,
    private showMessageService: ShowMessageService) { }

  getGenres() {
    this.dbOperationService.getGenres().subscribe(genre => {
      this.genres = <Genre[]>genre;
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

  deleteBook() {
    this.books.removeAt(this.books.length - 1);
  }

  submitData(form: FormGroup) {

    if (form.valid && form.status == "VALID") {

      let authorsData = form.value;

      for (let element of authorsData.books) {
        element.bookPagesNum = +element.bookPagesNum; // converting numPages to number
      }

      this.dbOperationService.setAuthor(authorsData).subscribe(() => {
        this.authors.push(authorsData);
      });

      this.showMessageService.showInfo('success-add-author', '', '');

    }

    else {
      alert("Error!");
    }
  }

  ngOnInit(): void {
    this.getGenres();
    this.createFormElements();
    this.books = this.formAddAuthor.get('books') as FormArray;
  }
}
