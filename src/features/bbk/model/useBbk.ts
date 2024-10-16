import {useLocation, useNavigate} from "react-router-dom";
import {TreeChecked} from "../../../global";
import NodesBBK, {type Node} from "../../../filterdata/NodesBBK";
type BKK = {
    checked:boolean;

}
type a = {
    d:5
}

export namespace BBK {
    export const useBBkKeys = () => {
        const location = useLocation()
        const bbkRouter = new URLSearchParams(location.search).get('bbk')?.split?.(',')?.sort?.(((a,b)=>+a[0]-+b[0]))||[]
        return bbkRouter.reduce((acc,bbk)=> {
            acc[isPartialCheckedBbkKey(bbk)? bbk.slice(1):bbk] = {checked:!isPartialCheckedBbkKey(bbk), partialChecked:isPartialCheckedBbkKey(bbk)} as TreeChecked
            return acc;
        }, {}) as Record<string, TreeChecked>
    }
    export const useBBkNodeFiltered = () => {
        const keys = useBBkKeys();
        const keysKeys = Object.keys(keys)
        const set = new Set(keysKeys);
        const notPartialNodes =  NodesBBK.filter((bkb) => {
            keysKeys.includes(bkb.label)
        })
    }
    export const removeBbk = () => {

    }
}
export const isPartialCheckedBbkKey = (key:string) => key.at(0) === '-'

export const useBbk = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search)
    const bbkRouter = searchParams.get('bbk')?.split?.(',')?.sort?.(((a,b)=>+a[0]-+b[0]))||[]
    console.log({bbkRouter})
    const bkkSelectedKeys = bbkRouter.reduce((acc,bbk)=> {
            acc[isPartialCheckedBbkKey(bbk)? bbk.slice(1):bbk] = {checked:!isPartialCheckedBbkKey(bbk), partialChecked:isPartialCheckedBbkKey(bbk)} as TreeChecked
             return acc;
        }, {}) as Record<string, TreeChecked>
    const apply = (nodes:Record<string, TreeChecked>) => {
        console.log({nodes})

        const selectedKeysArray = Object.keys(nodes).map(v=>nodes[v]?.partialChecked?`-${v}`:nodes[v]?.checked? v:undefined).filter(Boolean)
        searchParams.set('bbk',  selectedKeysArray.join(','));
        navigate({search:searchParams.toString()})
    }
    return {apply, bkkSelectedKeys}
}
