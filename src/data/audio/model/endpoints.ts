export namespace AudioEndpoints {
    export const getAllAudio = ({rows,start}:{rows:number, start:number}) => `/api/v1/audios/search/?rows=${rows}&start=${start}`;
    export const getExelAudio = () => `/api/v1/audios/search/xlsx`;
}

