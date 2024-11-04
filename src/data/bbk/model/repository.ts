import NodesBBK, {type Node} from "../../../filterdata/NodesBBK";
import {$api} from "../../../shared/lib/fetch-client";
import {BBKEndpoints} from "./endpoints";

export namespace BbkRepository {
    //тут фетч делать настойщий
    export const getAllBkk = async () => {
        return $api.get<Node[]>(BBKEndpoints.getAllBkk()).then(v=>v.data).catch(v=>NodesBBK)
    };
}
