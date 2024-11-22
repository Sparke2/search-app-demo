import {queryOptions, useQuery} from "@tanstack/react-query";
import {UGSNKeys} from "./keys";
import {UGSNRepository} from "./repository";

const getAllUGSNOptions = () => queryOptions({
    queryKey: UGSNKeys.getAll.ugsnAll(),
    queryFn: () => UGSNRepository.getAllUGSN(),
    staleTime: Infinity,
    refetchOnWindowFocus: true
})
export const useAllUGSN = () => {
    return useQuery(getAllUGSNOptions())
}
