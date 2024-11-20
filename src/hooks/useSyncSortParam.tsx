import {categories} from "../data/consts";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const useSyncSortParam = () => {
    const [cattmp, setCattmp] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        const currentCategories = categories
            .map(cat => (!!searchParams.get(cat) ? cat : undefined))
            .filter(Boolean);
        if (JSON.stringify(cattmp) !== JSON.stringify(currentCategories)) {
            //TODO category for another search url
            // console.log(JSON.stringify(currentCategories));
            // if (currentCategories = "")
            setCattmp(currentCategories);
            searchParams.delete('sort');
            navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
        }
    }, [location.search, navigate, categories, cattmp]);
};
