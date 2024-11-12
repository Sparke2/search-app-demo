import {ArchiveRepository} from "./repository";

export namespace ArchiveKeys {
    export namespace getAll {
        export const UNIQUE_PART = 'archive-all'
        export const ArchiveAll = (body: ArchiveRepository.archiveBody, query:{rows:number,start:number}) => [UNIQUE_PART, {body, query}]
    }
}
