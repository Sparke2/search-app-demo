import {useLocation, useNavigate} from "react-router-dom";

export const useCurrentLibrary = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const searParams = new URLSearchParams(location.search)
    const library = searParams.get('library')?.split(',').filter(Boolean) || [];
    const add = (newLibraryValue: string) => {
        const s = new Set(library)
        s.add(newLibraryValue)
        searParams.set('library', Array.from(s).join(','));
        navigate({search: searParams.toString()});
    }
    const remove = (newLibraryValue: string) => {
        const s = new Set(library)
        s.delete(newLibraryValue)
        searParams.set('library', Array.from(s).join(','));
        navigate({search: searParams.toString()});
    }
    const set = (newUsgn: string[]) => {
        const params = new URLSearchParams(location.search)
        params.set('library', newUsgn.join(','))
        navigate({search: params.toString()})

    }

    return {library, add, remove, set}
}
