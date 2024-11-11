export type Periodical = {
    id: number,
    title: string,
    description: string,
    publishers: string,
    collections: string[],
    ugnps: string[],
    isbn: string,
    vak: boolean,
    numbers: {
        year: number,
        issue: number
    }
}

export type PagintionResponse<T extends Record<string, unknown>> = {
    data: T[],
    pagination: {
        total: number,
        rows: number,
        start: number,
    }
}