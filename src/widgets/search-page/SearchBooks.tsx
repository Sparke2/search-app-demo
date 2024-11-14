import React, {useEffect, useState} from "react";
import {useAllBook} from "../../data/book/model/queries";
import {Skeleton} from "@mui/material";
import BookItem from "../../components/core/card/BookItem";
import ReactSelect from "../../components/core/filter/ReactSelect";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {faFileExcel} from "@fortawesome/free-regular-svg-icons";
import SearchResultTextBook from "../../hooks/SearchResultTextBook";
import {useQueryParam} from "../../hooks/useQueryParam";
import {useSearchAreaQueryParam} from "../../hooks/useSearchAreaQueryParam";
import {SearchPage} from "./ui/SortSelect";

export function SearchBooks() {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const handleCountChange = (value) => setCount(value);
    const value = useQueryParam('query');
    const field = useQueryParam('sort') || "score";
    const pubyearMin = Number(useQueryParam('fromYear'));
    const pubyearMax = Number(useQueryParam('toYear'));
    const by = useSearchAreaQueryParam();
    const modifier = "desc"

    const {
        data: { pagination: { rows = 0, start = 0, total = 0 } = {}, data: books = [] } = {},
        isPending,
        isFetching,
        isPlaceholderData,
    } = useAllBook({query:{value,by}, sorts:[{field,modifier}]}, { start: page * count, rows: count });

    useEffect(() => {
        setHasMore((page + 1) * count < total);
    }, [page, total, count]);

    return (
        <div className="pe-4">
            <div className="d-flex justify-content-between align-items-center mb-4 search-header">
                <SearchResultTextBook resultCount={total} />
                <button className="btn btn-outline-primary px-4">
                    <FontAwesomeIcon icon={faFileExcel} className="pe-2" /> Экспорт в Excel
                </button>
            </div>
            <div className="d-flex justify-content-between mb-5">
                <div className="d-flex gap-4 align-items-center">
                    <span className="paginate-text">Элементов на странице:</span>
                    <ReactSelect
                        key={`count-${count}`}
                        shouldApplyButtonRender={false}
                        options={[
                            { value: 10, label: '10' },
                            { value: 25, label: '25' },
                            { value: 50, label: '50' },
                            { value: 100, label: '100' },
                        ]}
                        defaultValue={{ value: count, label: count }}
                        onChange={({ value }) => handleCountChange(value)}
                    />
                </div>
                <SearchPage name="pub"/>
            </div>
            {isPending ? (
                new Array(count).fill(null).map((_, i) => (
                    <Skeleton style={{ width: '100%', height: 30 }} key={i} />
                ))
            ) : (
                <div className="row g-4">
                    {books.map((book, index) => (
                        <div className="col-12" key={book.id}>
                            <BookItem index={(page * count) + index + 1} book={book} />
                        </div>
                    ))}
                </div>
            )}
            <div className="d-flex justify-content-between align-items-center pt-4">
                <div className="d-flex gap-4 flex-col align-items-center btn-paginate">
                    <div>
                        <button
                            className="btn"
                            onClick={() => setPage((old) => Math.max(old - 1, 0))}
                            disabled={page === 0}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button
                            className="btn"
                            onClick={() => {
                                if (!isPlaceholderData && hasMore) {
                                    setPage((old) => old + 1);
                                }
                            }}
                            disabled={isPlaceholderData || !hasMore}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                    <span className="paginate-text">
                        {page * count + 1} - {Math.min((page + 1) * count, total)} из {total || 0}
                    </span>
                </div>

                <div className="d-flex gap-4 flex-col align-items-center">
                    <span className="paginate-text">Элементов на странице:</span>
                    <ReactSelect
                        key={`count-${count}`}
                        shouldApplyButtonRender={false}
                        options={[
                            { value: 10, label: '10' },
                            { value: 25, label: '25' },
                            { value: 50, label: '50' },
                            { value: 100, label: '100' },
                        ]}
                        defaultValue={{ value: count, label: count }}
                        onChange={({ value }) => handleCountChange(value)}
                    />
                </div>
            </div>
        </div>
    );
}
