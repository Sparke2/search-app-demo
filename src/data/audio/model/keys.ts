import {AudioRepository} from "./repository";

export namespace AudioKeys {
    export namespace getAll {
        export const UNIQUE_PART = 'audio-all'
        export const AudioAll = (body: AudioRepository.audioBody, query:{rows:number,start:number}) => [UNIQUE_PART, {body, query}]
    }
}
