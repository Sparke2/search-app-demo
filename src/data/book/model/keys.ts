import {BookRepository} from "./repository";

export namespace BookKeys {
    export namespace getAll {
        export const UNIQUE_PART = 'book-all'
        export const BookAll = (body: BookRepository.bookBody, query: {
            rows: number,
            start: number
        }) => [UNIQUE_PART, {body, query}]
    }
    export namespace getExel {
        export const UNIQUE_PART = 'book-exel' // умничка ❤️
        export const BookExel = (body: BookRepository.bookBody) => [UNIQUE_PART, {body}]
    }
}
