import {useLocation, useNavigate} from "react-router-dom";
import {TreeChecked} from "../../../global";
import {type Node} from "../../../filterdata/NodesBBK";
import {useAllBbk} from "../../../data/bbk/queries";




export const isPartialCheckedBbkKey = (key: string) => key.at(0) === '-'

export const useBbk = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {data:NodesBBK = []} = useAllBbk()
    const searchParams = new URLSearchParams(location.search)
    const bbkRouter = searchParams.get('bbk')?.split?.(',')?.sort?.(((a, b) => +a[0] - +b[0])) || []
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

        const foo = (node: Node): Node | null => {
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
        tree = tree.map(node => foo(node)).map(v=> v && v.children?v:undefined);

        return tree;
    };
    const nodesToSelectedKeys = (nodes: Node[]): Record<string, TreeChecked> => {
        let selectedKeys: Record<string, TreeChecked> = {};

        const foo = (node: Node, index: number): Node => {
            const originalNode = NodesBBK[index];

            const isFull = originalNode?.children?.length === node?.children?.length;

            if (node.children && node.children.length > 0) {
                node.children.forEach((childNode, childIndex) => {
                    foo(childNode, childIndex);
                });
            }

            selectedKeys[node.key] = {
                checked: isFull,
                partialChecked: !isFull
            };

            return node;
        };

        nodes.forEach((node, index) => {
            foo(node, index);
        });
        return selectedKeys;
    };
    const remove = (key:string) => {
        if(bkkSelectedKeys[key]){
            const newKeys = Object.keys(bkkSelectedKeys).filter(innerKey => {
                return !innerKey.startsWith(key) || innerKey === key;
            }).reduce((acc,cur) => {
                acc[cur] = bkkSelectedKeys[cur]
                return acc;
            }, {})
            delete newKeys[key]
            const d = filterNodesBbkByKeys(newKeys).filter(v=>v&& v.children.length)
            apply(nodesToSelectedKeys(d))

        }
    }

    return {apply, bkkSelectedKeys, filterNodesBbkByKeys, remove}
}
