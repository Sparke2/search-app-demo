import {mockNodesBbk} from "./mock";
import {$api} from "../../../shared/lib/fetch-client";
import {BBKEndpoints} from "./endpoints";
import {TreeNode} from "./types";

export namespace BbkRepository {
    //тут фетч делать настойщий
    export const getAllBkk = async () => {
        return $api.get<TreeNode[]>(BBKEndpoints.getAllBkk()).then(v=>v.data).catch(v=>mockNodesBbk)
    };
}
