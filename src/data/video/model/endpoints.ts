export namespace VideoEndpoints {
    export const getAllVideo = ({rows,start}:{rows:number, start:number}) => `/api/v1/videos/filter/?rows=${rows}&start=${start}`;
}

