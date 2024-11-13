import {useLocation} from "react-router-dom";
import {useMemo} from "react";

export const useArrayQueryParam = (param:string) => {
    const location = useLocation();
    return useMemo(() => {
        const params = new URLSearchParams(location.search).get(param);
        return params ? params.split(',') : [];
    }, [location.search, param]);
};