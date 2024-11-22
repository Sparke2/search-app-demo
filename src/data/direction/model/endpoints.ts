export namespace DirectionEndpoints {
    export const getAllDirection = (ugsn_ids: string[]) =>
        `/search-api?method=directions${ugsn_ids.map(id => `&ugsn_ids[]=${id}`).join('')}`;
}
