import {queryOptions, useQuery} from "@tanstack/react-query";
import {BookKeys} from "./keys";
import {BookRepository} from "./repository";

const getAllBookOptions = (body: BookRepository.bookBody, query:{rows:number,start:number}) => queryOptions({
    queryKey: BookKeys.getAll.BookAll(body, query),
    queryFn: () => BookRepository.getAllBook(body, query),
    staleTime: Infinity,
    refetchOnWindowFocus: true
})

export const useAllBook = (body: BookRepository.bookBody, query:{rows:number,start:number}) => {
    return useQuery(getAllBookOptions(body, query))
}
