import {$apiSmart} from "../../../shared/lib/fetch-client";
import {DirectionEndpoints} from "./endpoints";
import {Direction} from "./types";

export namespace DirectionRepository {
    export const getAllDirection = async (ugsn_ids: string[]) => {
        return $apiSmart.get<Direction>(DirectionEndpoints.getAllDirection(ugsn_ids)).then(v => v.data);
    };
}

