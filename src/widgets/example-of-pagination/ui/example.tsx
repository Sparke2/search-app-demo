// всё это должно лежать в data/название, но это просто пример
import {keepPreviousData, queryOptions, useQuery, useQueryClient} from "@tanstack/react-query";
import {getPaginated, PaginationResponse} from "../model/mock";
import React, {useState} from "react";
import ReactSelect from "../../../components/ReactSelect";
import {Skeleton} from "@mui/material";

const QueryOptions = (count: number, page: number) => queryOptions<PaginationResponse>(
    {
        refetchOnWindowFocus: true,
        queryKey: ['paginated-list'/*уникальное название*/, {params: {count, page}}],
        queryFn: () => getPaginated(page, count),
        placeholderData: keepPreviousData,
        throwOnError: false,


    }
)


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
                new Array(count).fill(null).map((_, i) => (
                    <Skeleton style={{width: '100%', height: 30}} key={i}/>
                ))
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
// плохо работает
//
// export const ExamplePaginatedListV2 = () => {
//     const [count, setCount] = useState(10);
//
//     const {
//         data: {pages = [], pageParams = []} = {},
//         isLoading,
//         isPlaceholderData,
//         isFetchingNextPage,
//         isFetchingPreviousPage,
//         hasNextPage,
//         hasPreviousPage,
//         fetchNextPage,
//         fetchPreviousPage
//     } = useInfiniteQuery<PaginationResponse, DefaultError, InfiniteData<PaginationResponse, number>, QueryKey, number>({
//         getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) => {
//             return 1;
//         },
//         getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
//             if (lastPage && lastPage?.results?.length !== count) return null;
//             if (!lastPage) return null;
//             return lastPageParam + 1;
//         },
//         initialPageParam: 1,
//         refetchOnWindowFocus: true,
//         queryKey: ['paginated-list-v2', {params: {count}}],
//         queryFn: ({pageParam}) => getPaginated(pageParam - 1, count),
//         placeholderData: keepPreviousData,
//         throwOnError: false,
//     });
//     const [lastPage] = pageParams.slice(-1) || [];
//     const items = pages?.[lastPage - 1]?.results ?? [];
//     const firstPages = pages?.[0];
//     console.log({pages})
//     return (
//         <div>
//             {isLoading ? (
//                 new Array(count).fill(null).map((_, i) => (
//                     <Skeleton style={{width: '100%', height: 30}} key={i}/>
//                 ))
//             ) : (
//                 <div>
//                     {items.map((project) => (
//                         <p key={project.id}>{project.description}</p>
//                     ))}
//                 </div>
//             )}
//             <span>{lastPage !== undefined ? (lastPage - 1) * count + 1 : 0} - {(count * lastPage) + count} из {firstPages?.count || 0}</span>
//             <span className='d-flex gap-4 flex-col'>
//                 <button
//                     onClick={async () => {
//                         await fetchPreviousPage();
//                     }}
//                     disabled={!hasPreviousPage}
//                 >
//                     {'<'}
//                 </button>
//                 <button
//                     onClick={async () => {
//                         await fetchNextPage();
//                     }}
//                     disabled={!hasNextPage}
//                 >
//                     {'>'}
//                 </button>
//                 <ReactSelect
//                     shouldApplyButtonRender={false}
//                     options={[{value: 10, label: '10'}, {value: 20, label: '20'}]}
//                     defaultValue={{value: count, label: count.toString()}}
//                     placeholder={10}
//                     onChange={({value}) => {
//                         console.log({value});
//                         setCount(value);
//                     }}
//                 />
//             </span>
//         </div>
//     );
// }
