import type {DefaultError, QueryKey} from "@tanstack/query-core";
import {UnusedSkipTokenOptions} from "@tanstack/react-query/src/queryOptions";
import {useFiltersLoading} from "./useFiltersLoading";
import {useQuery} from "@tanstack/react-query";

export const useSearchItemWithFiltersLoading = <
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>({enabled = true, ...queryOptions}: UnusedSkipTokenOptions<TQueryFnData, TError, TData, TQueryKey>) => {
    const filterEnabled = !useFiltersLoading()

    return useQuery({...queryOptions, enabled: filterEnabled && enabled})
}
