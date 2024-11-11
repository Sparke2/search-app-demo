export type PaginationResponse<T extends Record<string, unknown>> = {
    data: T[],
    pagination: {
        total: number;
        rows: number;
        start: number;
    }
}
