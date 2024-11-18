import React, {useEffect, useState} from "react";
import {useAllArchive} from "../../data/archive/model/queries";
import {Skeleton} from "@mui/material";
import ArchiveItem from "../../components/core/card/ArchiveItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExcel} from "@fortawesome/free-regular-svg-icons";
import SearchResultTextArchive from "../../hooks/SearchResultTextArchive";
import {useQueryParam} from "../../hooks/useQueryParam";
import {useSearchAreaQueryParam} from "../../hooks/useSearchAreaQueryParam";
import {useArrayQueryParam} from "../../hooks/useArrayQueryParam";
import ItemsPerPageSelect from "./ui/ItemsPerPageSelect";
import {SearchPage} from "./ui/SortSelect";
import Pagination from "./ui/Pagination";

export function SearchArchives() {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(10);
    const [hasMore, setHasMore] = useState(true);

    const handleCountChange = (value) => setCount(value);
    const value = useQueryParam('query');
    const by = useSearchAreaQueryParam();
    const collections = useArrayQueryParam('library');
    const field = useQueryParam('sort')?.trim() || "score";
    const modifier = useQueryParam('sort')?.trim() === "_title_" ? "asc" : "desc";
    const year = [Number(useQueryParam('fromYear')), Number(useQueryParam('toYear'))];
    const {
        data: {pagination: {rows = 0, start = 0, total = 0} = {}, data: archives = []} = {},
        isPending,
        isFetching,
        isPlaceholderData,
    } = useAllArchive({
        query: {value, by},
        filter: {collections, year},
        sorts: [{field, modifier}]
    }, {start: page * count, rows: count});

    useEffect(() => {
        setHasMore((page + 1) * count < total);
    }, [page, total, count]);

    return (
        <div className="pe-4">
            {total !== 0 ? (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-4 search-header">
                        <SearchResultTextArchive resultCount={total}/>
                        <button className="btn btn-outline-primary px-4">
                            <FontAwesomeIcon icon={faFileExcel} className="pe-2"/> Экспорт в Excel
                        </button>
                    </div>
                    <div className="d-flex justify-content-between mb-5">
                        <ItemsPerPageSelect count={count} handleCountChange={handleCountChange}/>
                        <SearchPage name=""/>
                    </div>
                    {isPending ? (
                        new Array(count).fill(null).map((_, i) => (
                            <Skeleton style={{width: '100%', height: 30}} key={i}/>
                        ))
                    ) : (
                        <div className="row g-4">
                            {archives.map((archive, index) => (
                                <div className="col-12" key={archive.id}>
                                    <ArchiveItem index={(page * count) + index + 1} archive={archive}/>
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
                        <ItemsPerPageSelect count={count} handleCountChange={handleCountChange}/>
                    </div>
                </>
            ) : (
                <div className="search-header">
                    <h5><span>По вашему запросу</span> {value} <span>ничего не найдено</span></h5>
                </div>
            )}
        </div>
    );
}
