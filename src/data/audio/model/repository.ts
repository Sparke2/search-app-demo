import {$api} from "../../../shared/lib/fetch-client";
import {AudioEndpoints} from "./endpoints";
import {Audio} from "./types";
import {PaginationResponse} from "../../../shared/api/types";

export namespace AudioRepository {

    export type audioBody = Partial<{
        query: {
            value: string,
            by: ("title" | "description")[]
        }
        filter: {
            executants: string[],
            genres: string[],
            pubhouses: string[],
            purposes: number[]
        }
        sorts: {
            field: string,
            modifier: string
        }
    }>

    export const getAllAudio = async (body: audioBody, query: { rows: number, start: number }) => {
        return $api.post<PaginationResponse<Audio>>(AudioEndpoints.getAllAudio(query), body).then(v => v.data)
    };
}
