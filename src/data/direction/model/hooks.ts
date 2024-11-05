import {useLocation, useNavigate} from "react-router-dom";

export const useCurrentDirection = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const searParams = new URLSearchParams(location.search)
    const direction = searParams.get('direction')?.split(',').filter(Boolean) || [];
    const add = (newDirectionValue: string) => {
        const s = new Set(direction)
        s.add(newDirectionValue)
        searParams.set('direction', Array.from(s).join(','));
        navigate({search: searParams.toString()});
    }
    const remove = (newDirectionValue: string) => {
        console.log({direction})
        const s = new Set(direction)
        s.delete(newDirectionValue)
        searParams.set('direction', Array.from(s).join(','));
        navigate({search: searParams.toString()});
    }
    const set = (newUsgn: string[]) => {
        const params = new URLSearchParams(location.search)
        params.set('direction', newUsgn.join(','))
        // if(!newUsgn.length){
        //     params.delete('direction')
        // }
        // params.delete('direction')
        navigate({search: params.toString()}) /// убрать связанные

    }

    return {direction, add, remove, set}
}
