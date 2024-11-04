import {queryOptions, useQuery} from "@tanstack/react-query";
import {UGSNKeys} from "./keys";
import {UGSNRepository} from "./repository";

const getAllUGSNOptions = (enabled?: boolean) => queryOptions({
    queryKey: UGSNKeys.getAll.ugsnAll(),
    queryFn: () => UGSNRepository.getAllUGSN(),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled,
    refetchOnWindowFocus: true
})
// enabled= false - не совершает запрос, enabled=true -совершаем, по умолчанию - true в самом useQuery
//
export const useAllUGSN = (enabled?: boolean) => {
    return useQuery(getAllUGSNOptions(enabled))
}
//staleTimeInfinty - всегда запрашивать из кеша, так как всегда NodesBbk одинаковые,+ переиспользуется
