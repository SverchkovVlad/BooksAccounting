import { Genre } from "./genre";

export interface Book {
    name: string,
    numOfPages: number,
    genre: Genre
}
