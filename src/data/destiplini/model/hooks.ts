import {useLocation, useNavigate} from "react-router-dom";

export const useCurrentDestiplini = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const searParams = new URLSearchParams(location.search)
    const destiplini = searParams.get('destiplini')?.split(',') || [];
    const add = (newDestipliniValue: string) => {
        const s = new Set(destiplini)
        s.add(newDestipliniValue)
        searParams.set('destiplini', Array.from(s).join(','));
        navigate({search: searParams.toString()});
    }
    const remove = (newDestipliniValue: string) => {
        const s = new Set(destiplini)
        s.delete(newDestipliniValue)
        searParams.set('destiplini', Array.from(s).join(','));
        navigate({search: searParams.toString()});
    }
    const set = (newUsgn: string[]) => {
        const params = new URLSearchParams(location.search)
        params.set('destiplini', newUsgn.join(','))
        navigate({search: params.toString()})

    }

    return {destiplini, add, remove, set}
}
