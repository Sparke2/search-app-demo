export namespace FilterKeys {
    export namespace getFilter {
        export const UNIQUE_PART = 'filter'
        export const Filter = (core: string, field: string) =>
            [UNIQUE_PART, core, field];
    }
}