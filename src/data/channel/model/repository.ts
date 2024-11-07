import {$api} from "../../../shared/lib/fetch-client";
import {ChannelEndpoints} from "./endpoints";
import {OptionsCheckboxForChannel} from "./mock";

export namespace ChannelRepository {
    export const getAllChannel = async () => {
        return $api.get<{
            value: string,
            label: string
        }[]>(ChannelEndpoints.getAllChannel()).then(v => v.data).catch(v => OptionsCheckboxForChannel)
    };
}
