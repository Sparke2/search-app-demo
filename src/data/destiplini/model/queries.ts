import {queryOptions, useQuery} from "@tanstack/react-query";
import {DestipliniKeys} from "./keys";
import {DestipliniRepository} from "./repository";

const getAllDestipliniOptions = (direction_ids:string []) => queryOptions({
    queryKey: [...DestipliniKeys.getAll.DestipliniAll(), {direction_ids}],
    queryFn: () => DestipliniRepository.getAllDestiplini(direction_ids),
    staleTime: Infinity,
    refetchOnWindowFocus: true
})

export const useAllDestiplini = (direction_ids:string[]) => {
    return useQuery(getAllDestipliniOptions(direction_ids))
}
