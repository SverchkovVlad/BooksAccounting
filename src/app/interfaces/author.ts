export interface Author {
    [x: string]: any;
    id: number,
    name: string,
    surname: string,
    patronymic: string,
    birthDate: Date,
    booksList: string[]
}
