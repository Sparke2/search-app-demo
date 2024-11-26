import {mockNodesBbk} from "./mock";
import {$api} from "../../../shared/lib/fetch-client";
import {BBKEndpoints} from "./endpoints";
import {TreeNode} from "./types";

export namespace BbkRepository {
    //тут фетч делать настойщий
    export const transformBkk = (tree: TreeNode[]) => {
        if (!tree || !Array.isArray(tree)) return tree;
        const foo = (node: TreeNode, parent?: TreeNode) => {
            if (!node.children) return node;
            return {
                ...node,
                key: !parent || node.key.startsWith(`${parent.key.split('-')?.[0]}-`) ? node.key : `${parent.key.split('-')[0]}-${node.key}`,
                childrenLen: node.children.length,
                children: node.children.map(v => foo(v, node))
            }
        }
        const f = tree.map(v => foo(v))
        console.log({f})
        return f
    }
    export const getAllBkk = async () => {

        return $api.get<TreeNode[]>(BBKEndpoints.getAllBkk()).then(v => transformBkk(v.data)).catch(v => transformBkk(mockNodesBbk))
    };
}
