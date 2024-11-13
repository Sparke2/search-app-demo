import {useLocation} from "react-router-dom";
import {useMemo} from "react";

export const useQueryParam = (param:string) => {
    const location = useLocation();
    return useMemo(() => new URLSearchParams(location.search).get(param) || '', [location.search, param]);
};