import {useLocation, useNavigate} from "react-router-dom";
import {getAllBkkOptions, useAllBbk} from "./queries";
import {TreeChecked} from "../../../global";
import {TreeNode} from "./types";
import {useQuery} from "@tanstack/react-query";


export const isPartialCheckedBbkKey = (key: string) => key.at(0) === '-'

export const useBbk = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {data: {data: NodesBBK = []} = {}} = useAllBbk()
    const searchParams = new URLSearchParams(location.search)
    const bbkRouter = searchParams.get('bbk')?.split?.(',')?.sort?.(((a, b) => +a[0] - +b[0])) || [];
    // console.log({bbkRouter})
    const bkkSelectedKeys = bbkRouter.reduce((acc, bbk) => {
        acc[isPartialCheckedBbkKey(bbk) ? bbk.slice(1) : bbk] = {
            checked: !isPartialCheckedBbkKey(bbk),
            partialChecked: isPartialCheckedBbkKey(bbk)
        } as TreeChecked
        return acc;
    }, {}) as Record<string, TreeChecked>
    const apply = (nodes: Record<string, TreeChecked>) => {
        const selectedKeysArray = Object.keys(nodes).map(v => nodes[v]?.partialChecked ? `-${v}` : nodes[v]?.checked ? v : undefined).filter(Boolean)
        searchParams.set('bbk', selectedKeysArray.join(','));
        navigate({search: searchParams.toString()})
    }
    const filterNodesBbkByKeys = (keys: Record<string, TreeChecked>) => {
        let tree = (JSON.parse(JSON.stringify(NodesBBK)) || []) as typeof NodesBBK;

        const foo = (node: TreeNode): TreeNode | null => {
            const curKey = keys?.[node.key];

            if (!curKey || (!curKey.checked && !curKey.partialChecked)) {
                return null;
            }


            if (curKey.checked && !curKey.partialChecked) {
                node.children = [];
            } else if (node.children && node.children.length > 0) {
                node.children = node.children.map(child => foo(child)).filter(child => child !== null);
            }

            return node;
        };
        // @ts-ignore
        tree = tree.map(node => foo(node)).map(v => v && v.children ? v : undefined);

        return tree as TreeNode[];
    };

    const remove = (key: string) => {
        if (bkkSelectedKeys[key]) {
            const keysToRemove = Object.keys(bkkSelectedKeys).filter(innerKey =>
                innerKey === key || innerKey === key[0] || innerKey.startsWith(`${key}.`) || innerKey.startsWith(`${key}-`)
            );

            const newKeys = Object.keys(bkkSelectedKeys)
                .filter(innerKey => !keysToRemove.includes(innerKey))
                .reduce((acc, cur) => {
                    acc[cur] = bkkSelectedKeys[cur];
                    return acc;
                }, {});
            apply(newKeys);
        }
    }

    return {apply, bkkSelectedKeys, filterNodesBbkByKeys, remove}
}
export const useBkkCurrent4Query = () => {
    const {bkkSelectedKeys} = useBbk()
    const {data: meta = {}, isPending} = useQuery({...getAllBkkOptions(), select: v => v.meta})
    const bbks = Object.entries(bkkSelectedKeys).map(([key, node]) => {
        console.log({meta: meta?.[key], key})
        return node.checked || node.partialChecked ? meta?.[key] : null;
    }).filter(Boolean) || []
    console.log({dsddssd: bbks, bkkSelectedKeys})
    return {bbks, isLoading: isPending} as { bbks: string[], isLoading: boolean }
}
