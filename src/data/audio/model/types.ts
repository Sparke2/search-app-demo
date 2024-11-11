export type Audio =
{
    id: number,
    title: string,
    executants: string[],
    recordyear: number,
    recordtime: string,
    collections: string[],
    description: string,
    pubhouses: string[],
    genres: string[]
}
export type PagintionResponse<T extends Record<string, unknown>> = {
    data: T[],
    pagination: {
        total: number,
        rows: number,
        start: number,
    }
}