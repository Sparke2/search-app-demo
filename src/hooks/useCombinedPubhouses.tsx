import {useCategoriesArray} from "../hooks/useCategoriesArray";
import {useFilter} from "../data/filter/model/queries";
import {Filter} from "../data/filter/model/types";

export const useCombinedPubhouses = () => {
    const categoriesArray = useCategoriesArray();

    const booksFilter = useFilter("books", "pubhouses");
    const periodicalsFilter = useFilter("periodicals", "publishers");
    const audioFilter = useFilter("audios", "pubhouses");

    const noActiveCategories = categoriesArray.length === 0;

    const activeFilters = noActiveCategories
        ? [booksFilter, periodicalsFilter, audioFilter]
        : [
            categoriesArray.includes("searchBooks") ? booksFilter : null,
            categoriesArray.includes("searchPeriodicals") ? periodicalsFilter : null,
            categoriesArray.includes("searchAudio") ? audioFilter : null,
        ].filter(Boolean) as { data: Filter[] | undefined; isLoading: boolean }[];

    const combinedPubhouses: Filter[] = activeFilters.flatMap((filter) => filter.data || []);

    const isLoading = activeFilters.some((filter) => filter.isLoading);

    return { data: combinedPubhouses, isLoading };
};
