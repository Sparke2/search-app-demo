import NodesBBK, {type Node} from "../../filterdata/NodesBBK";
import {delayPromise} from "../../shared/utils/delay";

export namespace BbkRepository {
    //тут фетч делать настойщий
    export const getAllBkk = () => {
        return delayPromise(500).then(_=>NodesBBK)
    };
}
