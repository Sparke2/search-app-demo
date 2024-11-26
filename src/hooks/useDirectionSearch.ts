import {useLocation} from "react-router-dom";
import {useMemo} from "react";
import {useAllDirection} from "../data/direction/model/queries";
import {useArrayQueryParam} from "./useArrayQueryParam";

export const useCurrentDirectionSearchQuery = () => {
    const arrUGSN: string[] = useArrayQueryParam('direction');
    return useAllDirection(arrUGSN);
}
export const useDirectionSearch = () => {
    const location = useLocation();

    const {data: rawDirectionData, isPending} = useCurrentDirectionSearchQuery();

    return useMemo(() => {
        const params = new URLSearchParams(location.search).get('direction');
        if (!isPending) {
            const directionMap = new Map(
                rawDirectionData?.data.map?.(({id, code, name}) => [String(id), `${code} ${name}`]),
            );
            return params
                ? params.split(',').map((id) => directionMap.get(id)).filter(Boolean)
                : [];
        }

    }, [location.search, rawDirectionData, isPending]);
};
