import {queryOptions, useQuery} from "@tanstack/react-query";
import {ArchiveKeys} from "./keys";
import {ArchiveRepository} from "./repository";

const getAllArchiveOptions = (body: ArchiveRepository.archiveBody, query:{rows:number,start:number}) => queryOptions({
    queryKey: ArchiveKeys.getAll.ArchiveAll(body, query),
    queryFn: () => ArchiveRepository.getAllArchive(body, query),
    staleTime: Infinity,
    refetchOnWindowFocus: true
})

export const useAllArchive = (body: ArchiveRepository.archiveBody, query:{rows:number,start:number}) => {
    return useQuery(getAllArchiveOptions(body, query))
}

const getExelArchiveOptions = (body: ArchiveRepository.archiveBody) => queryOptions({
    queryKey: ArchiveKeys.getExel.ArchiveExel(body),
    queryFn: () => ArchiveRepository.getExelArchive(body),
    staleTime: Infinity,
    refetchOnWindowFocus: true
})

export const useExelArchive = (body: ArchiveRepository.archiveBody) => {
    return useQuery(getExelArchiveOptions(body))
}
