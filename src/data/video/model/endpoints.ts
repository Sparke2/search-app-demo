export namespace VideoEndpoints {
    export const getAllVideo = ({rows,start}:{rows:number, start:number}) => `/api/v1/videos/search/?rows=${rows}&start=${start}`;
    export const getExelVideo = () => `/api/v1/videos/search/xlsx`;
}

