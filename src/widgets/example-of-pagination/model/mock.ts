// пример ответа пагинированного запроса, - массив results, count - Общее колво в базе, page - текущий номер страницы, next - номер следующее страницы или null - если нет дальше страниц
// если такого нет, то предположить, что страниц нет - можно
//a) мы запрашивает nextPage - если текущая страница.results.length !== count, т.е она не полная, значит дальше нет смысла листать, или если следующая страница в ответе - ничего(т.е ошибка), react query при ошибки вернет ничего
export type PaginationResponse = {
    results: { id: number; img: string; description: string }[];
    count: number;
    page: number;
    next: number | null;
};

export const getPaginated = (page: number, count: number = 10): PaginationResponse => {
    const totalItems = 100; // Assuming there are 100 items in total
    const totalPages = Math.ceil(totalItems / count);

    // Generate mock data for the current page
    const results = Array.from({length: count}, (_, index) => {
        const id = (page - 1) * count + index + 1;
        return {
            id,
            img: `https://example.com/image${id}.jpg`,
            description: `Description for item ${id}`,
        };
    });

    // Determine the next page number
    const next = page < totalPages ? page + 1 : null;

    return {
        results,
        count: totalItems,
        page,
        next,
    };
};

// Example usage
for (let i = 1; i <= 10; i++) {
    console.log(getPaginated(i));
}
