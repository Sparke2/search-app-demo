import {$api} from "../../../shared/lib/fetch-client";
import {DestipliniEndpoints} from "./endpoints";
import {OptionsCheckboxForDestiplini} from "./mock";

export namespace DestipliniRepository {
    //тут фетч делать настойщий
    export const getAllDestiplini = async () => {
        return $api.get<{
            value: string,
            label: string
        }[]>(DestipliniEndpoints.getAllDestiplini()).then(v => v.data).catch(v => OptionsCheckboxForDestiplini)
    };
}
