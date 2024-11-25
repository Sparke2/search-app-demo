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

const getExelBookOptions = (body: BookRepository.bookBody, enabled?: boolean) => queryOptions({
    queryKey: BookKeys.getExel.BookExel(body),
    queryFn: () => BookRepository.getExelBook(body),
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    enabled: enabled,
})

export const useExelBook = (body: BookRepository.bookBody, enabled?: boolean) => {
    return useSearchItemWithFiltersLoading(getExelBookOptions(body, enabled))
}