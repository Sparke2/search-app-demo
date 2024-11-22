export namespace DestipliniEndpoints {
    export const getAllDestiplini = (disciplines_ids: string[]) =>
        `/search-api?method=disciplines${disciplines_ids.map(id => `&direction_ids[]=${id}`).join('')}`;
}
