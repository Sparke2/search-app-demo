import { useLocation } from 'react-router-dom';
import {categories} from '../data/consts';
export const useCategoriesArray = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    return categories.map(cat => !!searchParams.get(cat)?cat:undefined).filter(Boolean)
}