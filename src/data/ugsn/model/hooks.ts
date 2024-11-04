import {useLocation, useNavigate} from "react-router-dom";

export const useCurrentUGSN = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const searParams = new URLSearchParams(location.search)
    const ugsn = searParams.get('ugsn')?.split(',').filter(Boolean) || [];
    const add = (newUgsnValue: string) => {
        const s = new Set(ugsn)
        s.add(newUgsnValue)
        searParams.set('ugsn', Array.from(s).join(','));
        navigate({search: searParams.toString()});
    }
    const remove = (newUgsnValue: string) => {
        const s = new Set(ugsn)
        s.delete(newUgsnValue)
        searParams.set('ugsn', Array.from(s).join(','));
        navigate({search: searParams.toString()});
    }
    const set = (newUsgn: string[]) => {
        const params = new URLSearchParams(location.search)
        params.set('ugsn', newUsgn.join(','))
        navigate({search: params.toString()})

    }

    return {ugsn, add, remove, set}
}
