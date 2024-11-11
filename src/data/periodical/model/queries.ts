import {queryOptions, useQuery} from "@tanstack/react-query";
import {PeriodicalKeys} from "./keys";
import {PeriodicalRepository} from "./repository";

const getAllPeriodicalOptions = (body: PeriodicalRepository.periodicalBody, query:{rows:number,start:number}) => queryOptions({
    queryKey: PeriodicalKeys.getAll.PeriodicalAll(body, query),
    queryFn: () => PeriodicalRepository.getAllPeriodical(body, query),
    staleTime: Infinity,
    refetchOnWindowFocus: true
})

export const useAllPeriodical = (body: PeriodicalRepository.periodicalBody, query:{rows:number,start:number}) => {
    return useQuery(getAllPeriodicalOptions(body, query))
}
