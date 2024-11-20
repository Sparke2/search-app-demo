import React, {useEffect, useState} from "react";
import {useAllBook} from "../../data/book/model/queries";
import {Skeleton} from "@mui/material";
import BookItem from "../../components/core/card/BookItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExcel} from "@fortawesome/free-regular-svg-icons";
import SearchResultTextBook from "../../hooks/SearchResultTextBook";
import {useQueryParam} from "../../hooks/useQueryParam";
import {useSearchAreaQueryParam} from "../../hooks/useSearchAreaQueryParam";
import {SearchPage} from "./ui/SortSelect";
import ItemsPerPageSelect from "./ui/ItemsPerPageSelect";
import Pagination from "./ui/Pagination";
import {useArrayQueryParam} from "../../hooks/useArrayQueryParam";

export function SearchBooks() {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState(0);
    const handleCountChange = (value) => setCount(value);
    const value = useQueryParam('query');
    const isbn = useQueryParam('isbn');
    const pubyear = [Number(useQueryParam('fromYear')), Number(useQueryParam('toYear'))];
    const by = useSearchAreaQueryParam();
    const field = useQueryParam('sort')?.trim() || "score";
    const modifier = useQueryParam('sort')?.trim() === "_title_" ? "asc" : "desc";
    const pubhouses = useArrayQueryParam('pubhouses');

    const {
        data: {pagination: {rows = 0, start = 0, total: fetchedTotal = 0} = {}, data: books = []} = {},
        isPending,
        isFetching,
        isPlaceholderData,
    } = useAllBook({
        query: {value, by},
        filter: {pubyear, pubhouses, ...(isbn ? {isbn} : {})},
        sorts: [{field, modifier}]
    }, {start: page * count, rows: count});

    useEffect(() => {
        if (!isPending && fetchedTotal !== total) {
            setTotal(fetchedTotal);
            setPage(0);
        }
    }, [fetchedTotal, total, isPending]);

    useEffect(() => {
        setHasMore((page + 1) * count < total);
    }, [page, total, count]);

    return (
        <div className="pe-4">
            {total !== 0 && (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-4 search-header">
                        <SearchResultTextBook resultCount={total}/>
                        <button className="btn btn-outline-primary px-4">
                            <FontAwesomeIcon icon={faFileExcel} className="pe-2"/> Экспорт в Excel
                        </button>
                    </div>
                    <div className="d-flex justify-content-between mb-5">
                        <ItemsPerPageSelect count={count} handleCountChange={handleCountChange}/>
                        <SearchPage name="pub"/>
                    </div>
                </>
            )}
            {isPending ? (
                new Array(count).fill(null).map((_, i) => (
                    <Skeleton style={{width: '100%', height: 30}} key={i}/>
                ))
            ) : books.length === 0 && total === 0 ? (
                <div className="search-header">
                    <h5><span>По вашему запросу</span> {value} <span>ничего не найдено</span></h5>
                </div>
            ) : (
                <div className="row g-4">
                    {books.map((book, index) => (
                        <div className="col-12" key={book.id}>
                            <BookItem index={(page * count) + index + 1} book={book}/>
                        </div>
                    ))}
                </div>
            )}
            {total !== 0 && (
                <>
                    <div className="d-flex justify-content-between align-items-center pt-4">
                        <Pagination
                            page={page}
                            setPage={setPage}
                            hasMore={hasMore}
                            isPlaceholderData={isPlaceholderData}
                            total={total}
                            count={count}
                        />
                        <ItemsPerPageSelect count={count} handleCountChange={handleCountChange}/>
                    </div>
                </>
            )}
        </div>
    );
}
