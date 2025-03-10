import {VideoRepository} from "./repository";

export namespace VideoKeys {
    export namespace getAll {
        export const UNIQUE_PART = 'video-all'
        export const VideoAll = (body: VideoRepository.videoBody, query:{rows:number,start:number}) => [UNIQUE_PART, {body, query}]
    }

    export namespace getExel {
        export const UNIQUE_PART = 'video-exel'
        export const VideoExel = (body: VideoRepository.videoBody) => [UNIQUE_PART, {body}]
    }
}
