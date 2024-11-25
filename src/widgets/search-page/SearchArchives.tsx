import React, {useEffect, useState} from "react";
import {useAllArchive} from "../../data/archive/model/queries";
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
import {BookSkeleton} from "../../data/book/ui/BookSkeleton";
import {toast, ToastContainer} from "react-toastify";
import {ArchiveRepository} from "../../data/archive/model/repository";
import getExelArchive = ArchiveRepository.getExelArchive;

export function SearchArchives() {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState(0);
    const handleCountChange = (value) => setCount(value);
    const value = useQueryParam('query');
    const by = useSearchAreaQueryParam();
    const collections = useArrayQueryParam('library');
    const field = useQueryParam('sort')?.trim() || "score";
    const modifier = useQueryParam('sort')?.trim() === "_title_" ? "asc" : "desc";
    const year = [Number(useQueryParam('fromYear')), Number(useQueryParam('toYear'))];
    const {
        data: {pagination: {rows = 0, start = 0, total: fetchedTotal = 0} = {}, data: archives = []} = {},
        isPending,
        isFetching,
        isPlaceholderData,
    } = useAllArchive({
        query: {value, by},
        filter: {collections, year},
        sorts: [{field, modifier}]
    }, {start: page * count, rows: count});

    const downloadExcel = async (body: ArchiveRepository.archiveBody) => {
        await toast.promise(
            getExelArchive(body).then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'archives.xlsx';
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
            filter: {collections, year},
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
            <div className="d-flex justify-content-between align-items-center mb-4 search-header">
                <SearchResultTextArchive resultCount={total || 0}/>
                <ToastContainer position="top-right"
                                autoClose={5000}
                                closeOnClick
                                draggable  />
                <button className="btn btn-outline-primary px-4" onClick={handleDownloadExcel}>
                    <FontAwesomeIcon icon={faFileExcel} className="pe-2"/> Экспорт в Excel
                </button>
            </div>
            <div className="d-flex justify-content-between mb-5">
                <ItemsPerPageSelect count={count} handleCountChange={handleCountChange}/>
                <SearchPage name=""/>
            </div>
            {isPending ? (
                <div className="row g-4">
                    {new Array(count).fill(null).map((_, i) => (
                        <BookSkeleton index={i} key={i}/>
                    ))}
                </div>
            ) : archives.length === 0 && total === 0 ? (
                <div className="search-header">
                    <h5><span>По вашему запросу</span> {value} <span>ничего не найдено</span></h5>
                </div>
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
                    total={total || 0}
                    count={count}
                />
                <ItemsPerPageSelect count={count} handleCountChange={handleCountChange}/>
            </div>
        </div>
    );
}
