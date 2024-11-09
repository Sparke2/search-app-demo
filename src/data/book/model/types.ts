export type Book =
{
    id: number,
    bbks: `${number}`[],
    ugnps: `${number}`[],
    title: string,
    authors: string[],
    pubyear: number,
    additTitle: string,
    collections: string[],
    description: string,
    disciplines: string[],
    pubhouses: string[],
    pubtype: string,
    pageCount: number,
}