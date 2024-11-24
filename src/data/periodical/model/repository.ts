import {$api} from "../../../shared/lib/fetch-client";
import {PeriodicalEndpoints} from "./endpoints";
import {Periodical} from "./types";
import {PaginationResponse} from "../../../shared/api/types";

export namespace PeriodicalRepository {

    export type periodicalBody = Partial<{
        query: {
            value: string,
            by: ("title" | "description")[]
        }
        filter: Partial<{
            "numbers.year": number[],
            publishers: string[],
            ugnps: string[],
            profiles: string[],
            disciplines: string[],
            isbn: string,
            vak: boolean
        }>
        sorts: {
            field: string,
            modifier: string
        }[]
    }>

    export const getAllPeriodical = async (body: periodicalBody, query: { rows: number, start: number }) => {
        return $api.post<PaginationResponse<Periodical>>(PeriodicalEndpoints.getAllPeriodical(query), body).then(v => v.data)
    };
}
