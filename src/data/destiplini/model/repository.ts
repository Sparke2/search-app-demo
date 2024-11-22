import {$apiSmart} from "../../../shared/lib/fetch-client";
import {DestipliniEndpoints} from "./endpoints";
import {Disciplini} from "./types";

export namespace DestipliniRepository {
    export const getAllDestiplini = async (direction_ids:string[]) => {
        return $apiSmart.get<Disciplini>(DestipliniEndpoints.getAllDestiplini(direction_ids)).then(v => v.data)
    };
}
