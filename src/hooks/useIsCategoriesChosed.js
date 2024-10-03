import { useCategoriesArray } from './useCategoriesArray';

export const useIsCategoriesChosed = () => {
    return !!useCategoriesArray().length
}
