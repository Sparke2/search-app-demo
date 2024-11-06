// всё это должно лежать в data/название, но это просто пример
import {keepPreviousData, queryOptions, useQuery, useQueryClient} from "@tanstack/react-query";
import {getPaginated, PaginationResponse} from "../model/mock";
import React, {useState} from "react";
import ReactSelect from "../../../components/ReactSelect";

const QueryOptions = (count: number, page: number) => queryOptions<PaginationResponse>(
    {
        refetchOnWindowFocus: true,
        queryKey: ['paginated-list'/*уникальное название*/, {params: {count, page}}],
        queryFn: () => getPaginated(page, count),
        placeholderData: keepPreviousData,
        throwOnError: false,


    }
)

export interface PaginatedListSchema<ItemSchema extends any[]> {
    isEmpty?: boolean;
    isLoading?: boolean;
    isFetching?: boolean;
    isFetchingNextPage?: boolean;
    isFetchingPreviousPage?: boolean;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
    content: ItemSchema;
}

export const ExmaplePaginatedList = () => {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(10);
    const {
        data,
        isPending,
        isFetching,
        isPlaceholderData,
    } = useQuery(QueryOptions(count, page));
    const queryClient = useQueryClient()
    console.log({count})
    // const pages = queryClient.getQueriesData<PaginationResponse>({predicate: ({queryKey}) => queryKey?.[0] === 'paginated-list'})
    return (
        <div>
            {isPending ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {data.results.map((project) => (
                        <p key={project.id}>{project.description}</p>
                    ))}
                </div>
            )}
            <span>{page * count + 1} - {(count * page) + count} из {data?.count}</span>
            <span className='d-flex gap-4 flex-col'>
                <button
                    onClick={() => setPage((old) => Math.max(old - 1, 0))}
                    disabled={page === 0}
                >
                {'<'}
            </button>
            <button
                onClick={() => {
                    if (!isPlaceholderData && data.next) {
                        setPage((old) => old + 1)
                    }
                }}
                // заблочить next button
                disabled={isPlaceholderData || !data?.next}
            >
                {'>'}
            </button>
                <ReactSelect
                    shouldApplyButtonRender={false}
                    options={[{value: 10, label: '10'}, {value: 20, label: '20'}]}
                    defaultValue={count}
                    placeholder={10}
                    onChange={({value}) => {
                        console.log({value})
                        setCount(value)
                    }}
                />
            </span>

            {/*{isFetching ? <span> Loading...</span> : null}*/}
        </div>
    )

}
