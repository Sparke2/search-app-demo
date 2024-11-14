import React, {useEffect, useState} from "react";
import {useAllAudio} from "../../data/audio/model/queries";
import {Skeleton} from "@mui/material";
import AudioItem from "../../components/core/card/AudioItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExcel} from "@fortawesome/free-regular-svg-icons";
import SearchResultTextAudio from "../../hooks/SearchResultTextAudio";
import {useQueryParam} from "../../hooks/useQueryParam";
import {useSearchAreaQueryParam} from "../../hooks/useSearchAreaQueryParam";
import {useArrayQueryParam} from "../../hooks/useArrayQueryParam";
import {useCheckboxQueryParams} from "../../hooks/useCheckboxQueryParams";
import ItemsPerPageSelect from "./ui/ItemsPerPageSelect";
import {SearchPage} from "./ui/SortSelect";
import Pagination from "./ui/Pagination";

export function SearchAudio() {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(10);
    const [hasMore, setHasMore] = useState(true);

    const handleCountChange = (value) => setCount(value);
    const value = useQueryParam('query');
    const by = useSearchAreaQueryParam();
    const executants = useArrayQueryParam('performers');
    const genres = useCheckboxQueryParams('genre');
    const field = useQueryParam('sort')?.trim() || "score";
    const modifier = "desc";

    const {
        data: { pagination: { rows = 0, start = 0, total = 0 } = {}, data: audios = [] } = {},
        isPending,
        isFetching,
        isPlaceholderData,
    } = useAllAudio({query:{value,by}, filter:{executants,genres}, sorts: [{ field, modifier }]}, { start: page * count, rows: count });

    useEffect(() => {
        setHasMore((page + 1) * count < total);
    }, [page, total, count]);

    return (
        <div className="pe-4">
            <div className="d-flex justify-content-between align-items-center mb-4 search-header">
                <SearchResultTextAudio resultCount={total}/>
                <button className="btn btn-outline-primary px-4">
                    <FontAwesomeIcon icon={faFileExcel} className="pe-2"/> Экспорт в Excel
                </button>
            </div>
            <div className="d-flex justify-content-between mb-5">
                <ItemsPerPageSelect count={count} handleCountChange={handleCountChange}/>
                <SearchPage name="record"/>
            </div>
            {isPending ? (
                new Array(count).fill(null).map((_, i) => (
                    <Skeleton style={{width: '100%', height: 30}} key={i}/>
                ))
            ) : (
                <div className="row g-4">
                    {audios.map((audio, index) => (
                        <div className="col-12" key={audio.id}>
                            <AudioItem index={(page * count) + index + 1} audio={audio}/>
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
