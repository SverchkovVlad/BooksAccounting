import { Genre } from "./genre";

export interface Book {
    bookName: string,
    bookPagesNum: number,
    bookGenre: Genre
}
