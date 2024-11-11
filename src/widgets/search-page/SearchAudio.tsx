import React, {useEffect, useMemo, useState} from "react";
import {useAllAudio} from "../../data/audio/model/queries";
import {Skeleton} from "@mui/material";
import AudioItem from "../../components/core/card/AudioItem";
import ReactSelect from "../../components/ReactSelect";
import {useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {faFileExcel} from "@fortawesome/free-regular-svg-icons";
import SearchResultTextAudio from "../../hooks/SearchResultTextAudio";

export function SearchAudio() {
    const location = useLocation();
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(10);
    const [hasMore, setHasMore] = useState(true);

    const handleCountChange = (value) => setCount(value);

    const query = useMemo(() => new URLSearchParams(location.search).get('query') || '', [location.search]);
    const queryBy = useMemo(() => {
        const searchParams = new URLSearchParams(location.search);
        const fields = [];
        if (searchParams.get('title')) fields.push('title');
        if (searchParams.get('description')) fields.push('description');
        return fields;
    }, [location.search]);

    const {
        data: { pagination: { rows = 0, start = 0, total = 0 } = {}, data: audios = [] } = {},
        isPending,
        isFetching,
        isPlaceholderData,
    } = useAllAudio({ query, queryBy }, { start: page * count, rows: count });

    useEffect(() => {
        setHasMore((page + 1) * count < total);
    }, [page, total, count]);

    return (
        <div className="pe-4">
            <div className="d-flex justify-content-between align-items-center mb-4 search-header">
                <SearchResultTextAudio resultCount={total} />
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
                <div className="d-flex gap-4 align-items-center filter-select">
                    <span className="paginate-text">Сортировка по: </span>
                    <ReactSelect
                        shouldApplyButtonRender={false}
                        options={[
                            { value: 'newSort', label: 'новизне' },
                            { value: 'availSort', label: 'доступности' },
                            { value: 'relSort', label: 'релевантности' },
                            { value: 'alfSort', label: 'алфавиту' },
                            { value: 'yearSort', label: 'году' },
                        ]}
                        defaultValue={{ value: 'newSort', label: 'новизне' }}
                        placeholder={'новизне'}
                    />
                </div>
            </div>
            {isPending ? (
                new Array(count).fill(null).map((_, i) => (
                    <Skeleton style={{ width: '100%', height: 30 }} key={i} />
                ))
            ) : (
                <div className="row g-4">
                    {audios.map((audio, index) => (
                        <div className="col-12" key={audio.id}>
                            <AudioItem index={(page * count) + index + 1} audio={audio} />
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
