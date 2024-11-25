import React, {useEffect, useState} from "react";
import {useAllAudio} from "../../data/audio/model/queries";
import AudioItem from "../../components/core/card/AudioItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExcel} from "@fortawesome/free-regular-svg-icons";
import {useQueryParam} from "../../hooks/useQueryParam";
import {useSearchAreaQueryParam} from "../../hooks/useSearchAreaQueryParam";
import {useArrayQueryParam} from "../../hooks/useArrayQueryParam";
import {useCheckboxQueryParams} from "../../hooks/useCheckboxQueryParams";
import ItemsPerPageSelect from "./ui/ItemsPerPageSelect";
import {SearchPage} from "./ui/SortSelect";
import Pagination from "./ui/Pagination";
import {BookSkeleton} from "../../data/book/ui/BookSkeleton";
import {toast, ToastContainer} from "react-toastify";
import {AudioRepository} from "../../data/audio/model/repository";
import SearchResultTextArchive from "../../hooks/SearchResultTextArchive";
import getExelAudio = AudioRepository.getExelAudio;

export function SearchAudio() {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState(0);
    const handleCountChange = (value) => setCount(value);
    const value = useQueryParam('query');
    const by = useSearchAreaQueryParam();
    const executants = useArrayQueryParam('performers');
    const collections = useCheckboxQueryParams('collection');
    const genres = useCheckboxQueryParams('genre');
    const field = useQueryParam('sort')?.trim() || "score";
    const modifier = useQueryParam('sort')?.trim() === "_title_" ? "asc" : "desc";
    const recordyear = [Number(useQueryParam('fromYear')), Number(useQueryParam('toYear'))];
    const pubhouses = useArrayQueryParam('pubhouses');

    const {
        data: {pagination: {rows = 0, start = 0, total: fetchedTotal = 0} = {}, data: audios = []} = {},
        isPending,
        isFetching,
        isPlaceholderData,
    } = useAllAudio({
        query: {value, by},
        filter: {executants, pubhouses, genres, recordyear, collections},
        sorts: [{field, modifier}]
    }, {start: page * count, rows: count});

    const downloadExcel = async (body: AudioRepository.audioBody) => {
        await toast.promise(
            getExelAudio(body).then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'audios.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }),
            {
                pending: 'Файл формируется...',
                success: 'Файл успешно загружен',
                error: 'Ошибка при генерации файла',
            }
        );
    };

    const handleDownloadExcel = () => {
        downloadExcel({
            query: {value, by},
            filter: {executants, pubhouses, genres, recordyear, collections},
            sorts: [{field, modifier}]
        });
    };

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
            <div className="d-flex flex-sm-row gap-2 flex-column justify-content-between align-items-sm-center mb-4 search-header">
                <SearchResultTextArchive resultCount={total || 0}/>
                <ToastContainer position="top-right"
                                autoClose={5000}
                                closeOnClick
                                draggable/>
                <button className="btn btn-outline-primary px-4" onClick={handleDownloadExcel}>
                    <FontAwesomeIcon icon={faFileExcel} className="pe-2"/> Экспорт в Excel
                </button>
            </div>
            <div className="d-flex flex-md-row gap-3 flex-column justify-content-between mb-5">
                <ItemsPerPageSelect count={count} handleCountChange={handleCountChange}/>
                <SearchPage name="record"/>
            </div>
            {isPending ? (
                <div className="row g-4">
                {new Array(count).fill(null).map((_, i) => (
                        <BookSkeleton index={i} key={i}/>
                    ))}
                </div>
            ) : audios.length === 0 && total === 0 ? (
                <div className="search-header">
                    <h5><span>По вашему запросу</span> {value} <span>ничего не найдено</span></h5>
                </div>
            ) : (
                <div className="row g-4">
                    {audios.map((audio, index) => (
                        <div className="col-12" key={audio.id}>
                            <AudioItem index={(page * count) + index + 1} audio={audio}/>
                        </div>
                    ))}
                </div>
            )}
            <div className="d-flex flex-md-row flex-column gap-3 justify-content-between align-items-sm-center pt-4">
                <Pagination
                    page={page}
                    setPage={setPage}
                    hasMore={hasMore}
                    isPlaceholderData={isPlaceholderData}
                    total={total || 0}
                    count={count}
                />
                <ItemsPerPageSelect count={count} handleCountChange={handleCountChange}/>
            </div>
        </div>
    );
}
