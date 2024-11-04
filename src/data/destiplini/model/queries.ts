import {queryOptions, useQuery} from "@tanstack/react-query";
import {DestipliniKeys} from "./keys";
import {DestipliniRepository} from "./repository";

const getAllDestipliniOptions = (enabled?: boolean) => queryOptions({
    queryKey: DestipliniKeys.getAll.DestipliniAll(),
    queryFn: () => DestipliniRepository.getAllDestiplini(),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: enabled,
    refetchOnWindowFocus: true
})

export const useAllDestiplini = (enabled?: boolean) => {
    return useQuery(getAllDestipliniOptions(enabled))
}
//staleTimeInfinty - всегда запрашивать из кеша, так как всегда NodesBbk одинаковые,+ переиспользуется
