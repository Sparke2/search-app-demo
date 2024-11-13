import {queryOptions, useQuery} from "@tanstack/react-query";
import {LibraryKeys} from "./keys";
import {LibraryRepository} from "./repository";

const getAllLibraryOptions = () => queryOptions({
    queryKey: LibraryKeys.getAll.LibraryAll(),
    queryFn: () => LibraryRepository.getAllLibrary(),
    staleTime: Infinity,
    refetchOnWindowFocus: true
})

export const useAllLibrary = () => {
    return useQuery(getAllLibraryOptions())
}
