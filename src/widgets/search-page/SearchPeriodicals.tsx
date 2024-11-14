import React, {useEffect, useState} from "react";
import {useAllPeriodical} from "../../data/periodical/model/queries";
import {Skeleton} from "@mui/material";
import PeriodicalItem from "../../components/core/card/PeriodicalItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExcel} from "@fortawesome/free-regular-svg-icons";
import SearchResultTextPeriodical from "../../hooks/SearchResultTextPeriodical";
import {useQueryParam} from "../../hooks/useQueryParam";
import {useSearchAreaQueryParam} from "../../hooks/useSearchAreaQueryParam";
import ItemsPerPageSelect from "./ui/ItemsPerPageSelect";
import {SearchPage} from "./ui/SortSelect";
import Pagination from "./ui/Pagination";

export function SearchPeriodicals() {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const handleCountChange = (value) => setCount(value);
    const value = useQueryParam('query');
    const by = useSearchAreaQueryParam();
    const field = useQueryParam('sort')?.trim() || "score";
    const modifier = "desc";

    const {
        data: { pagination: { rows = 0, start = 0, total = 0 } = {}, data: periodicals = [] } = {},
        isPending,
        isFetching,
        isPlaceholderData,
    } = useAllPeriodical({query:{value,by}, sorts: [{ field, modifier }]}, { start: page * count, rows: count });

    useEffect(() => {
        setHasMore((page + 1) * count < total);
    }, [page, total, count]);

    return (
        <div className="pe-4">
            <div className="d-flex justify-content-between align-items-center mb-4 search-header">
                <SearchResultTextPeriodical resultCount={total}/>
                <button className="btn btn-outline-primary px-4">
                    <FontAwesomeIcon icon={faFileExcel} className="pe-2"/> Экспорт в Excel
                </button>
            </div>
            <div className="d-flex justify-content-between mb-5">
                <ItemsPerPageSelect count={count} handleCountChange={handleCountChange}/>
                <SearchPage name="pub"/>
            </div>
            {isPending ? (
                new Array(count).fill(null).map((_, i) => (
                    <Skeleton style={{width: '100%', height: 30}} key={i}/>
                ))
            ) : (
                <div className="row g-4">
                    {periodicals.map((periodical, index) => (
                        <div className="col-12" key={periodical.id}>
                            <PeriodicalItem index={(page * count) + index + 1} periodical={periodical}/>
                        </div>
                    ))}
                </div>
            )}
            <div className="d-flex justify-content-between align-items-center pt-4">
                <Pagination
                    page={page}
                    setPage={setPage}
                    hasMore={hasMore}
                    isPlaceholderData={isPlaceholderData}
                    total={total}
                    count={count}
                />
                <ItemsPerPageSelect count={count} handleCountChange={handleCountChange} />
            </div>
        </div>
    );
}
