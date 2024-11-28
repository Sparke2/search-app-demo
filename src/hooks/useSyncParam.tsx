import {categories} from "../data/consts";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const useSyncParam = () => {
    const [cattmp, setCattmp] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        const currentCategories = categories
            .map(cat => (!!searchParams.get(cat) ? cat : undefined))
            .filter(Boolean);
        if (JSON.stringify(cattmp) !== JSON.stringify(currentCategories)) {
            if (!currentCategories.includes('searchBooks') && currentCategories.length > 0) {
                searchParams.delete('bbk');
                searchParams.delete('author');
                searchParams.delete('editions');
                searchParams.delete('additionals');
                searchParams.delete('targets');
                console.log('нет книг')
            }
            if (!['searchPeriodicals', 'searchBooks'].some(category => currentCategories.includes(category)) && currentCategories.length > 0) {
                searchParams.delete('isbn');
                searchParams.delete('ugsn');
                searchParams.delete('direction');
                searchParams.delete('destiplini');
            }
            if (!['searchPeriodicals', 'searchBooks','searchAudio'].some(category => currentCategories.includes(category)) && currentCategories.length > 0) {
                searchParams.delete('pubhouses');
                searchParams.delete('availability');
            }
            if (!['searchPeriodicals', 'searchBooks','searchAudio','searchArchives'].some(category => currentCategories.includes(category)) && currentCategories.length > 0) {
                searchParams.delete('fromYear');
                searchParams.delete('toYear');
            }
            if (!(['searchPeriodicals'].some(category => currentCategories.includes(category)))) {
                searchParams.delete('vak');
                searchParams.delete('subscribe');
            }

            if (!(['searchAudio'].some(category => currentCategories.includes(category)))) {
                const paramsKeys = Array.from(searchParams.keys());
                for (let i = 0; i < paramsKeys.length; i++) {
                    const key = paramsKeys[i];
                    if (key.startsWith('genre-') || key.startsWith('collection-')) {
                        searchParams.delete(key);
                    }
                }
                searchParams.delete('performers');
                searchParams.delete('appointments');
            }

            if (!(['searchVideo'].some(category => currentCategories.includes(category)))) {
                searchParams.delete('channel');
            }
            if (!(['searchArchives'].some(category => currentCategories.includes(category)))) {
                searchParams.delete('library');
            }
            setCattmp(currentCategories);
            searchParams.delete('sort');
            navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
        }
    }, [location.search, navigate, categories, cattmp]);
};
