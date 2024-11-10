import {useLocation} from 'react-router-dom';
import {area} from '../data/consts';

export const useAreaSearchArray = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    return area.map(cat => !!searchParams.get(cat)?cat:undefined).filter(Boolean)
}