import {$api} from "../../../shared/lib/fetch-client";
import {VideoEndpoints} from "./endpoints";
import {Video} from "./types";
import {PaginationResponse} from "../../../shared/api/types";

export namespace VideoRepository {

    export type videoBody = Partial<{
        query: {
            value: string,
            by: ("title" | "description")[]
        }
        filter: {
            channels: string[]
        }
        sorts: {
            field: string,
            modifier: string
        }[]
    }>

    export const getAllVideo = async (body: videoBody, query: { rows: number, start: number }) => {
        return $api.post<PaginationResponse<Video>>(VideoEndpoints.getAllVideo(query), body).then(v => v.data)
    };
}
