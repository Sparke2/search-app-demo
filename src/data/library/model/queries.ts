import {queryOptions, useQuery} from "@tanstack/react-query";
import {LibraryKeys} from "./keys";
import {LibraryRepository} from "./repository";

const getAllLibraryOptions = (enabled?: boolean) => queryOptions({
    queryKey: LibraryKeys.getAll.LibraryAll(),
    queryFn: () => LibraryRepository.getAllLibrary(),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: enabled,
    refetchOnWindowFocus: true
})

export const useAllLibrary = (enabled?: boolean) => {
    return useQuery(getAllLibraryOptions(enabled))
}
