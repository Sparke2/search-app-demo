import {$api} from "../../../shared/lib/fetch-client";
import {DirectionEndpoints} from "./endpoints";
import {OptionsCheckboxForDirection} from "./mock";

export namespace DirectionRepository {
    //тут фетч делать настойщий
    export const getAllDirection = async () => {
        return $api.get<{
            value: string,
            label: string
        }[]>(DirectionEndpoints.getAllDirection()).then(v => v.data).catch(v => OptionsCheckboxForDirection)
    };
}
