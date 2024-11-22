import {$apiSmart} from "../../../shared/lib/fetch-client";
import {UGSNEndpoints} from "./endpoints";
import {UGSN} from "./types";

export namespace UGSNRepository {
    export const getAllUGSN = async () => {
        return $apiSmart.get<UGSN>(UGSNEndpoints.getAllUGSN()).then(v => v.data)
    };
}
