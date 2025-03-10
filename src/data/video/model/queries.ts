import {queryOptions, useQuery} from "@tanstack/react-query";
import {VideoKeys} from "./keys";
import {VideoRepository} from "./repository";

const getAllVideoOptions = (body: VideoRepository.videoBody, query:{rows:number,start:number}) => queryOptions({
    queryKey: VideoKeys.getAll.VideoAll(body, query),
    queryFn: () => VideoRepository.getAllVideo(body, query),
    staleTime: Infinity,
    refetchOnWindowFocus: true
})

export const useAllVideo = (body: VideoRepository.videoBody, query:{rows:number,start:number}) => {
    return useQuery(getAllVideoOptions(body, query))
}

const getExelVideoOptions = (body: VideoRepository.videoBody) => queryOptions({
    queryKey: VideoKeys.getExel.VideoExel(body),
    queryFn: () => VideoRepository.getExelVideo(body),
    staleTime: Infinity,
    refetchOnWindowFocus: true
})

export const useExelVideo = (body: VideoRepository.videoBody) => {
    return useQuery(getExelVideoOptions(body))
}
