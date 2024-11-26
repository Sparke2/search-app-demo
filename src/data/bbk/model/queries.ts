import {queryOptions, useQuery} from "@tanstack/react-query";
import {BbkKeys} from "./keys";
import {BbkRepository} from "./repository";

const getAllBkkOptions = () => queryOptions({
    queryKey: BbkKeys.getAll.bbkAll(),
    queryFn: () => BbkRepository.getAllBkk(),
    staleTime: Infinity,
    gcTime: 10000,
})

export const useAllBbk = () => {
    return useQuery(getAllBkkOptions())
}
//staleTimeInfinty - всегда запрашивать из кеша, так как всегда NodesBbk одинаковые,+ переиспользуется
