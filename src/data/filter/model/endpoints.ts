export namespace FilterEndpoints {
    export const getFilter = ({ core, field }: { core: string; field: string }) => `/api/v1/${core}/facet/${field}`;
}