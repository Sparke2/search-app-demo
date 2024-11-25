import {queryOptions, useQuery} from "@tanstack/react-query";
import {AudioKeys} from "./keys";
import {AudioRepository} from "./repository";

const getAllAudioOptions = (body: AudioRepository.audioBody, query:{rows:number,start:number}) => queryOptions({
    queryKey: AudioKeys.getAll.AudioAll(body, query),
    queryFn: () => AudioRepository.getAllAudio(body, query),
    staleTime: Infinity,
    refetchOnWindowFocus: true
})

export const useAllAudio = (body: AudioRepository.audioBody, query:{rows:number,start:number}) => {
    return useQuery(getAllAudioOptions(body, query))
}

const getExelAudioOptions = (body: AudioRepository.audioBody) => queryOptions({
    queryKey: AudioKeys.getExel.AudioExel(body),
    queryFn: () => AudioRepository.getExelAudio(body),
    staleTime: Infinity,
    refetchOnWindowFocus: true
})

export const useExelAudio = (body: AudioRepository.audioBody) => {
    return useQuery(getExelAudioOptions(body))
}
