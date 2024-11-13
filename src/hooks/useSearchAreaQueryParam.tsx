import {useLocation} from "react-router-dom";
import {useMemo} from "react";

export const useSearchAreaQueryParam = () => {
    const location = useLocation();
    return useMemo(() => {
        const searchParams = new URLSearchParams(location.search);
        const fields = [];

        if (searchParams.get('title')) fields.push('title');
        if (searchParams.get('description')) fields.push('description');

        if (fields.length === 0) {
            fields.push('title', 'description');
        }

        return fields;
    }, [location.search]);
};
