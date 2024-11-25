export namespace ArchiveEndpoints {
    export const getAllArchive = ({rows,start}:{rows:number, start:number}) => `/api/v1/archives/search/?rows=${rows}&start=${start}`;
    export const getExelArchive = () => `/api/v1/archives/search/xlsx`;
}

