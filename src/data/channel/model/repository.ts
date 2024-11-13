import {$api} from "../../../shared/lib/fetch-client";
import {ChannelEndpoints} from "./endpoints";
import {Filter} from "../../filter/model/types";

export namespace ChannelRepository {
    export const getAllChannel = async () => {
        return $api.get<Filter>(ChannelEndpoints.getAllChannel()).then(v => v.data)
    };
}
