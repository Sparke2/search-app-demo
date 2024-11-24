import {queryOptions} from "@tanstack/react-query";
import {PeriodicalKeys} from "./keys";
import {PeriodicalRepository} from "./repository";
import {useSearchItemWithFiltersLoading} from "../../../hooks/useFiltersLoading/useQueryItemsWithLoading";

const getAllPeriodicalOptions = (body: PeriodicalRepository.periodicalBody, query: {
    rows: number,
    start: number
}, enabled?: boolean) => queryOptions({
    queryKey: PeriodicalKeys.getAll.PeriodicalAll(body, query),
    queryFn: () => PeriodicalRepository.getAllPeriodical(body, query),
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    enabled: enabled,
})

export const useAllPeriodical = (body: PeriodicalRepository.periodicalBody, query: {
    rows: number,
    start: number
}, enabled?: boolean) => {
    return useSearchItemWithFiltersLoading(getAllPeriodicalOptions(body, query))
}
