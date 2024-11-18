import {$api} from "../../../shared/lib/fetch-client";
import {ArchiveEndpoints} from "./endpoints";
import {Archive} from "./types";
import {PaginationResponse} from "../../../shared/api/types";

export namespace ArchiveRepository {

    export type archiveBody = Partial<{
        query: {
            value: string,
            by: ("title" | "description")[]
        }
        filter: {
            collections: string[],
            year: number[],
        }
        sorts: {
            field: string,
            modifier: string
        }[]
    }>

    export const getAllArchive = async (body: archiveBody, query: { rows: number, start: number }) => {
        return $api.post<PaginationResponse<Archive>>(ArchiveEndpoints.getAllArchive(query), body).then(v => v.data)
    };
}
