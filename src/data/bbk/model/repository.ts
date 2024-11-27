import {$apiSmart} from "../../../shared/lib/fetch-client";
import {BBKEndpoints} from "./endpoints";
import {TreeNode} from "./types";
import {type ResultsResponse} from "../../../shared/api/types";
import {mockNodesBbk} from "./mock";

export namespace BbkRepository {
    export const transformBkk = (tree: TreeNode[], response: {}): TreeNode[] => {
        if (!tree || !Array.isArray(tree)) return tree;
        const foo = (node: TreeNode, parent?: TreeNode) => {
            node.key = node.key.replace(/ /g, '')
            if (!node.children) return node;
            const key = !parent || node.key.startsWith(`${parent.key.split('-')?.[0]}-`) ? node.key : `${parent.key.split('-')[0]}-${node.key}`
            if (!isNaN(parseFloat(node.label.split(' ')?.[0]))) {
                response[key] = (node.label.split(' ')?.[0])
            }
            return {
                ...node,
                key: key,
                childrenLen: node.children.length,
                ...(!isNaN(parseFloat(node.label.split(' ')?.[0]))) ? {searchKey: node.label.split(' ')[0]} : {},
                children: node.children.map(v => {
                    return foo(v, node)
                })
            }
        }
        return tree.map(v => foo(v))
    }
    export const getAllBkk = async () => {
        const metaData = {}
        return $apiSmart.get<ResultsResponse<TreeNode, Record<string, string>>>(BBKEndpoints.getAllBkk()).then(v => ({
            ...v.data,
            data: transformBkk(v.data.success ? v.data.data : mockNodesBbk, metaData),
            meta: metaData
        }))
    };
}
