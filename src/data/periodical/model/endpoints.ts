export namespace PeriodicalEndpoints {
    export const getAllPeriodical = ({rows,start}:{rows:number, start:number}) => `/api/v1/periodicals/filter/?rows=${rows}&start=${start}`;
}

