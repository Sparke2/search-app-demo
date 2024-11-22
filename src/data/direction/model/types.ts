export type Direction = {
    success : boolean,
    message : string,
    data : {
        id: string,
        ugnp_id: string,
        code: string,
        name: string,
        level_id: string,
    }[]
}