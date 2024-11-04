import {queryOptions, useQuery} from "@tanstack/react-query";
import {DirectionKeys} from "./keys";
import {DirectionRepository} from "./repository";

const getAllDirectionOptions = (enabled?: boolean) => queryOptions({
    queryKey: DirectionKeys.getAll.DirectionAll(),
    queryFn: () => DirectionRepository.getAllDirection(),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: enabled,
    refetchOnWindowFocus: true
})

export const useAllDirection = (enabled?: boolean) => {
    return useQuery(getAllDirectionOptions(enabled))
}
//staleTimeInfinty - всегда запрашивать из кеша, так как всегда NodesBbk одинаковые,+ переиспользуется
