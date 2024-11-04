import {type Node} from "../../../filterdata/NodesBBK";
import {$api} from "../../../shared/lib/fetch-client";
import {UGSNEndpoints} from "./endpoints";
import {OptionsCheckboxForUGSN} from "./mock";

export namespace UGSNRepository {
    //тут фетч делать настойщий
    export const getAllUGSN = async () => {
        return $api.get<Node[]>(UGSNEndpoints.getAllUGSN()).then(v=>v.data).catch(v=>OptionsCheckboxForUGSN)
    };
}
