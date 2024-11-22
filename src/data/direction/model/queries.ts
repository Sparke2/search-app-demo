import {queryOptions, useQuery} from "@tanstack/react-query";
import {DirectionKeys} from "./keys";
import {DirectionRepository} from "./repository";

const getAllDirectionOptions = (ugsn_ids: string[]) => queryOptions({
    queryKey: [...DirectionKeys.getAll.DirectionAll(), { ugsn_ids }],
    queryFn: () => DirectionRepository.getAllDirection(ugsn_ids),
    staleTime: Infinity,
    refetchOnWindowFocus: true
});

export const useAllDirection = (ugsn_ids: string[]) => {
    return useQuery(getAllDirectionOptions(ugsn_ids));
};

