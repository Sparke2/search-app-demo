import {queryOptions, useQuery} from "@tanstack/react-query";
import {UGSNKeys} from "./keys";
import {UGSNRepository} from "./repository";

const getAllUGSNOptions = () => queryOptions({
    queryKey: UGSNKeys.getAll.ugsnAll(),
    queryFn: () => UGSNRepository.getAllUGSN(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: true
})

export const useAllUGSN = () => {
    return useQuery(getAllUGSNOptions())
}
//staleTimeInfinty - всегда запрашивать из кеша, так как всегда NodesBbk одинаковые,+ переиспользуется
