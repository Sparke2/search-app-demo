import {useLocation} from "react-router-dom";
import {useMemo} from "react";
import {useArrayQueryParam} from "./useArrayQueryParam";
import {useAllDestiplini} from "../data/destiplini/model/queries";

export const useCurrentDisciplinesSearch = () => {
    const arrDirection: string[] = useArrayQueryParam('destiplini');
    return useAllDestiplini(arrDirection);
}
export const useDisciplinesSearch = () => {
    const location = useLocation();
    const {data: rawDisciplinData, isPending} = useCurrentDisciplinesSearch()

    return useMemo(() => {
        const params = new URLSearchParams(location.search).get('destiplini');
        if (!isPending) {
            const disciplinMap = new Map(
                rawDisciplinData.data.map(({id, name}) => [String(id), name]),
            );
            return params
                ? params.split(',').map((id) => disciplinMap.get(id)).filter(Boolean)
                : [];
        }

    }, [location.search, rawDisciplinData, isPending]);
};
