import {$api} from "../../../shared/lib/fetch-client";
import {PeriodicalEndpoints} from "./endpoints";
import {Periodical} from "./types";
import {PaginationResponse} from "../../../shared/api/types";

export namespace PeriodicalRepository {

    export type periodicalBody = Partial<{
        query: string,
        queryBy: ("title" | "description")[],
        publishers: string[],
        ugnps: string[]
    }>

    export const getAllPeriodical = async (body: periodicalBody, query: { rows: number, start: number }) => {
        return $api.post<PaginationResponse<Periodical>>(PeriodicalEndpoints.getAllPeriodical(query), body).then(v => v.data)
    };
}
