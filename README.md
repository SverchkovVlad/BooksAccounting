# AccountingBooksProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

Books Accounting Project represents simple manager, which allows to make basic manipulations with authors, books and book genres.

## Description

The project has next features: 

- responsive design (up to 320px width);
- perfomance were tested in Mozilla Firefox, Opera, Google Chrome, Microsoft Edge;
- adding, deleting and editing of authors (name, surname, patronymic, date of birth, written books);
- adding, deleting and editing of books (title, number of pages, genre);
- adding, deleting and editing of book genres (title);
- sorting by authors name, surname, patronymic, date of birth, amount of written books;
- sorting of book genres by alphabet;
- searching for author by book title;
- basic information about authors in responsive table;
- full info about specific author in particular modal window;
- for REST API purposes - JSON-server from typicode (https://github.com/typicode/json-server).

## Additional information

The project was originally developed in Visual Studio Code for Mozilla Firefox on laptop with 14 inch display and screen resolution 1920x1080.

## Running project

1. Download project as .zip file and unpack it.
2. Separately install node_modules to 'BooksAccounting-main' folder.
3. Download JSON-server from https://github.com/typicode/json-server. We will use it for immitation data loading from server.
4. Using VS Code (or another code editor) open db.json file in JSON-server and replace it`s content with next code:

```json
{
  "authors": [
    {
      "id": 1,
      "name": "Taras",
      "surname": "Shevchenko",
      "patronymic": "Grygorovich",
      "birthDate": "09/03/1814",
      "books": [
        {
          "bookName": "Kateryna",
          "bookPagesNum": 48,
          "bookGenre": "Novel"
        },
        {
          "bookName": "Zapovit",
          "bookPagesNum": 1,
          "bookGenre": "Novel"
        },
        {
          "bookName": "Kobzar",
          "bookPagesNum": 140,
          "bookGenre": "Novel"
        }
      ]
    },
    {
      "id": 2,
      "name": "Joanne",
      "surname": "Rowling",
      "patronymic": "Kathleen",
      "birthDate": "31/07/1965",
      "books": [
        {
          "bookName": "Harry Potter and the Sorcerer`s stone",
          "bookPagesNum": 301,
          "bookGenre": "Children`s book"
        },
        {
          "bookName": "Harry Potter and the Chamber of Secrets",
          "bookPagesNum": 418,
          "bookGenre": "Children`s book"
        },
        {
          "bookName": "Harry Potter and the Prisoner of Azkaban",
          "bookPagesNum": 426,
          "bookGenre": "Children`s book"
        },
        {
          "bookName": "Harry Potter and the Goblet of Fire",
          "bookPagesNum": 654,
          "bookGenre": "Children`s book"
        },
        {
          "bookName": "Harry Potter and the Order of Phoenix",
          "bookPagesNum": 992,
          "bookGenre": "Children`s book"
        },
        {
          "bookName": "Harry Potter and the Half-blood Prince",
          "bookPagesNum": 789,
          "bookGenre": "Children`s book"
        },
        {
          "bookName": "Harry Potter and the Deathly Hallows",
          "bookPagesNum": 823,
          "bookGenre": "Children`s book"
        }
      ]
    },
    {
      "id": 3,
      "name": "Vladimir",
      "surname": "Nabokov",
      "patronymic": "Vladimirovich",
      "birthDate": "10/04/1899",
      "books": [
        {
          "bookName": "Lolita",
          "bookPagesNum": 486,
          "bookGenre": "Children`s book"
        },
        {
          "bookName": "Pale Fire",
          "bookPagesNum": 607,
          "bookGenre": "Children`s book"
        },
        {
          "bookName": "PniN",
          "bookPagesNum": 264,
          "bookGenre": "Children`s book"
        }
      ]
    },
    {
      "id": 4,
      "name": "George",
      "surname": "Martin",
      "patronymic": "Raymond Richard",
      "birthDate": "20/09/1948",
      "books": [
        {
          "bookName": "A Game of Thrones",
          "bookPagesNum": 862,
          "bookGenre": "Dark fantasy"
        },
        {
          "bookName": "A Clash of Kings",
          "bookPagesNum": 941,
          "bookGenre": "Dark fantasy"
        },
        {
          "bookName": "A Storm of Swords",
          "bookPagesNum": 988,
          "bookGenre": "Dark fantasy"
        },
        {
          "bookName": "A Feast for Crows",
          "bookPagesNum": 753,
          "bookGenre": "Dark fantasy"
        },
        {
          "bookName": "A Dance with Dragons",
          "bookPagesNum": 866,
          "bookGenre": "Dark fantasy"
        }
      ]
    },
    {
      "id": 5,
      "name": "Mikhail",
      "surname": "Bulgakov",
      "patronymic": "Afanasyevich",
      "birthDate": "03/05/1891",
      "books": [
        {
          "bookName": "The Master and Margarita",
          "bookPagesNum": 420,
          "bookGenre": "Dark fantasy"
        },
        {
          "bookName": "The White Guard",
          "bookPagesNum": 196,
          "bookGenre": "Dark fantasy"
        },
        {
          "bookName": "Theatrical Novel",
          "bookPagesNum": 271,
          "bookGenre": "Dark fantasy"
        },
        {
          "bookName": "The Fatal Eggs",
          "bookPagesNum": 136,
          "bookGenre": "Dark fantasy"
        },
        {
          "bookName": "A Young Doctor`s Notebook",
          "bookPagesNum": 169,
          "bookGenre": "Dark fantasy"
        },
        {
          "bookName": "Heart of a Dog",
          "bookPagesNum": 465,
          "bookGenre": "Dark fantasy"
        }
      ]
    },
    {
      "name": "Evgeniy",
      "surname": "Nickolayevich",
      "patronymic": "Ponasenkov",
      "birthDate": "13/03/1982",
      "books": [
        {
          "bookName": "First scientific history of 1812 war",
          "bookPagesNum": 976,
          "bookGenre": "Historical drama"
        }
      ],
      "id": 6
    }
  ],
  "genres": [
    {
      "id": 2,
      "name": "Dark fantasy"
    },
    {
      "id": 3,
      "name": "Detective fiction"
    },
    {
      "id": 4,
      "name": "Novel"
    },
    {
      "id": 5,
      "name": "Children`s book"
    },
    {
      "name": "Horror",
      "id": 6
    },
    {
      "name": "Scientific fiction",
      "id": 7
    },
    {
      "name": "Poetry",
      "id": 9
    },
    {
      "name": "Historical drama",
      "id": 10
    }
  ]
}
```

5. Run 'npm start' in JSON-server terminal to launch the server.
6. In BooksAccounting project also run 'npm start' to launch the application.

## Demonstration 

## Responsive design demonstration
