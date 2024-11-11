export type Video =
{
    id: number,
    title: string,
    link: string,
    channel: string,
    description: string
}
export type PagintionResponse<T extends Record<string, unknown>> = {
    data: T[],
    pagination: {
        total: number,
        rows: number,
        start: number,
    }
}