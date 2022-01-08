export interface Author {
    id: number,
    name: string,
    surname: string,
    patronymic: string,
    birthDate: Date,
    books: [ 
        {
            bookName: string, 
            bookPagesNum: number,
            bookGenre: string
        }
    ]
}
