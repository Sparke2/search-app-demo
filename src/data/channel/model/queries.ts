import {queryOptions, useQuery} from "@tanstack/react-query";
import {ChannelKeys} from "./keys";
import {ChannelRepository} from "./repository";

const getAllChannelOptions = () => queryOptions({
    queryKey: ChannelKeys.getAll.ChannelAll(),
    queryFn: () => ChannelRepository.getAllChannel(),
    staleTime: Infinity,
    refetchOnWindowFocus: true
})

export const useAllChannel = () => {
    return useQuery(getAllChannelOptions())
}
