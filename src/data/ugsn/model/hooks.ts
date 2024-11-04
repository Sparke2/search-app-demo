import {useLocation, useNavigate} from "react-router-dom";

export const useUGSN = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const searParams = new URLSearchParams(location.search)
    const ugsn = searParams.get('ugsn')?.split(',');
    const add = (newUgsnValue:string) => {
        const s = new Set(ugsn)
        s.add(newUgsnValue)
        searParams.set('ugsn', Array.from(s).join(','));
        navigate({search:searParams.toString()});
    }
    const remove = (newUgsnValue:string) => {
        const s = new Set(ugsn)
        s.delete(newUgsnValue)
        searParams.set('ugsn', Array.from(s).join(','));
        navigate({search:searParams.toString()});
    }
    return {ugsn, add, remove}
}