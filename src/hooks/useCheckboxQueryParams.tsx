import {useLocation} from 'react-router-dom';
import {useMemo} from 'react';

export const useCheckboxQueryParams = (param:string) => {
    const location = useLocation();

    return useMemo(() => {
        const params = new URLSearchParams(location.search);
        const paramRes: string[] = [];

        params.forEach((value, key) => {
            if (key.startsWith(`${param}-`) && value === 'true') {
                const genreValue = key.replace(`${param}-`, '');
                paramRes.push(decodeURIComponent(genreValue));
            }
        });

        return paramRes;
    }, [location.search]);
};
