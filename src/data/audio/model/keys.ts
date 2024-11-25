import {AudioRepository} from "./repository";

export namespace AudioKeys {
    export namespace getAll {
        export const UNIQUE_PART = 'audio-all'
        export const AudioAll = (body: AudioRepository.audioBody, query:{rows:number,start:number}) => [UNIQUE_PART, {body, query}]
    }

    export namespace getExel {
        export const UNIQUE_PART = 'audio-exel'
        export const AudioExel = (body: AudioRepository.audioBody) => [UNIQUE_PART, {body}]
    }
}
