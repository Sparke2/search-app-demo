export type Archive =
{
    id: number,
    title: string,
    collections: string[],
    description: string,
    pageCount: number,
    year: number
}
export type PagintionResponse<T extends Record<string, unknown>> = {
    data: T[],
    pagination: {
        total: number,
        rows: number,
        start: number,
    }
}