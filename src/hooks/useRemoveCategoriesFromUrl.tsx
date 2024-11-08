import {useLocation, useNavigate} from "react-router-dom";
import {categories} from "../data/consts";

export function useRemoveCategoriesFromUrl() {
    const location = useLocation();
    const navigate = useNavigate();

    function removeCategoriesFromUrl(keepCategory) {
        const searchParams = new URLSearchParams(location.search);

        categories.forEach(category => {
            if (category !== keepCategory) {
                searchParams.delete(category);
            }
        });

        if (keepCategory) {
            searchParams.set(keepCategory, 'true');
        }

        navigate({
            pathname: location.pathname,
            search: searchParams.toString(),
        });
    }

    return removeCategoriesFromUrl;
}
