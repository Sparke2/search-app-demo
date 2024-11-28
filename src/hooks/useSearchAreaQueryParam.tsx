import {useLocation} from "react-router-dom";
import {useMemo} from "react";

export const useSearchAreaQueryParam = (cat?: string) => {
    const location = useLocation();
    return useMemo(() => {
        const searchParams = new URLSearchParams(location.search);
        const fields = [];
        if (searchParams.get('title')) fields.push('title');
        if (searchParams.get('description')) fields.push('description');
        if (cat === 'books') {
            if (searchParams.get('author')) fields.push('authors');
        }

        if (fields.length === 0) {
            if (cat === 'books') {
                fields.push('authors','title', 'description');
            } else {
                fields.push('title', 'description');
            }
        }

        return fields;
    }, [location.search]);
};
