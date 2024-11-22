import {useLocation} from "react-router-dom";
import {useMemo} from "react";
import {useAllUGSN} from "../data/ugsn/model/queries";

export const useUGSNSearch = () => {
    const location = useLocation();
    const { data: rawUgsnData, isPending } = useAllUGSN();

    return useMemo(() => {
        const params = new URLSearchParams(location.search).get('ugsn');
        if (!isPending) {
            const ugsnMap = new Map(
                rawUgsnData.data.map(({ id, code, name }) => [String(id), `${code} ${name}`]),
            );
            return params
                ? params.split(',').map((id) => ugsnMap.get(id)).filter(Boolean)
                : [];
        }

    }, [location.search, rawUgsnData, isPending]);
};
