export namespace PeriodicalEndpoints {
    export const getAllPeriodical = ({rows,start}:{rows:number, start:number}) => `/api/v1/periodicals/search/?rows=${rows}&start=${start}`;
}

