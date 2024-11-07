import {queryOptions, useQuery} from "@tanstack/react-query";
import {ChannelKeys} from "./keys";
import {ChannelRepository} from "./repository";

const getAllChannelOptions = (enabled?: boolean) => queryOptions({
    queryKey: ChannelKeys.getAll.ChannelAll(),
    queryFn: () => ChannelRepository.getAllChannel(),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: enabled,
    refetchOnWindowFocus: true
})

export const useAllChannel = (enabled?: boolean) => {
    return useQuery(getAllChannelOptions(enabled))
}
