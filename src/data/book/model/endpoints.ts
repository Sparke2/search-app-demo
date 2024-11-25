export namespace BookEndpoints {
    export const getAllBook = ({rows,start}:{rows:number, start:number}) => `/api/v1/books/search/?rows=${rows}&start=${start}`;
    export const getExelBook = () => `/api/v1/books/search/xlsx`;
}

