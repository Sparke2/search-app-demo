import {queryOptions, useQuery} from "@tanstack/react-query";
import {AudioFilesKeys} from "./keys";
import {AudioFilesRepository} from "./repository";

const getAllAudioFilesOptions = (enabled?: boolean) => queryOptions({
    queryKey: AudioFilesKeys.getAll.AudioFilesAll(),
    queryFn: () => AudioFilesRepository.getAllAudioFiles(),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: enabled,
    refetchOnWindowFocus: true
})

export const useAllAudioFiles = (enabled?: boolean) => {
    return useQuery(getAllAudioFilesOptions(enabled))
}
