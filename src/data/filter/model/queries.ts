import {queryOptions, useQuery} from "@tanstack/react-query";
import {FilterKeys} from "./keys";
import {FilterRepository} from "./repository";

const getFilterOptions = (core: string, field: string) => queryOptions({
    queryKey: FilterKeys.getFilter.Filter(core, field),
    queryFn: () => FilterRepository.getFilter(core, field),
    staleTime: Infinity,
    refetchOnWindowFocus: true
});

export const useFilter = (core: string, field: string) => {
    return useQuery(getFilterOptions(core, field));
}