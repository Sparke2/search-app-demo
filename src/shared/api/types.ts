export type PaginationResponse<T extends Record<string, unknown>> = {
    data: T[],
    pagination: {
        total: number;
        rows: number;
        start: number;
    }
}
export type ResultsResponse<T extends Record<string, unknown>, M extends Record<string, unknown> = never> = {
    data: T[]
    message?: string;
    success: boolean;
    meta?: M
}
