import {$api} from "../../../shared/lib/fetch-client";
import {FilterEndpoints} from "./endpoints";
import {Filter} from "./types";

export namespace FilterRepository {
    export const getFilter = async (core: string, field: string) => {
        return $api.get<Filter>(FilterEndpoints.getFilter({ core, field })).then(v => v.data)
    };
}