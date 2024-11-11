import {$api} from "../../../shared/lib/fetch-client";
import {BookEndpoints} from "./endpoints";
import {Book} from "./types";
import {PaginationResponse} from "../../../shared/api/types";

export namespace BookRepository {

    export type bookBody = Partial<{
        query: string,
        queryBy: ("title" | "description")[],
        authors: string[],
        pubtypes: string[],
        collections: string[],
        pubhouses: string[],
        pubyearMin: number,
        pubyearMax: number,
        pageCountMin: number,
        pageCountMax: number,
        priceMin: number,
        priceMax: number
    }>

    export const getAllBook = async (body: bookBody, query: { rows: number, start: number }) => {
        return $api.post<PaginationResponse<Book>>(BookEndpoints.getAllBook(query), body).then(v => v.data)
    };
}
