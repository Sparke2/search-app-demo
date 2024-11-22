import {queryOptions} from "@tanstack/react-query";
import {BookKeys} from "./keys";
import {BookRepository} from "./repository";
import {useSearchItemWithFiltersLoading} from "../../../hooks/useFiltersLoading/useQueryItemsWithLoading";

const getAllBookOptions = (body: BookRepository.bookBody, query: {
    rows: number,
    start: number
}, enabled?: boolean) => queryOptions({
    queryKey: BookKeys.getAll.BookAll(body, query),
    queryFn: () => BookRepository.getAllBook(body, query),
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    enabled: enabled,
})

export const useAllBook = (body: BookRepository.bookBody, query: {
    rows: number,
    start: number
}, enabled?: boolean) => {
    return useSearchItemWithFiltersLoading(getAllBookOptions(body, query, enabled))
}
