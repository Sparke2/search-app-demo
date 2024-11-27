import React, {useEffect, useState} from "react";
import {useAllBook} from "../../data/book/model/queries";
import BookItem from "../../components/core/card/BookItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExcel} from "@fortawesome/free-regular-svg-icons";
import {useQueryParam} from "../../hooks/useQueryParam";
import {useSearchAreaQueryParam} from "../../hooks/useSearchAreaQueryParam";
import {SearchPage} from "./ui/SortSelect";
import ItemsPerPageSelect from "./ui/ItemsPerPageSelect";
import Pagination from "./ui/Pagination";
import {useArrayQueryParam} from "../../hooks/useArrayQueryParam";
import {useUGSNSearch} from "../../hooks/useUGSNSearch";
import {useDirectionSearch} from "../../hooks/useDirectionSearch";
import {useDisciplinesSearch} from "../../hooks/useDisciplinesSearch";
import {BookSkeleton} from "../../data/book/ui/BookSkeleton";
import {BookRepository} from "../../data/book/model/repository";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResultTextBook from "../../hooks/SearchResultTextBook";
import {useAdditional} from "../../hooks/useAdditional";
import getExelBook = BookRepository.getExelBook;

export function SearchBooks() {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState(0);
    const handleCountChange = (value) => setCount(value);
    const value = useQueryParam('query');
    const isbn = useQueryParam('isbn');
    const purposes = useArrayQueryParam('targets');
    const pubtypes = useArrayQueryParam('editions');
    const pubyear = [Number(useQueryParam('fromYear')), Number(useQueryParam('toYear'))];
    const by = useSearchAreaQueryParam();
    const field = useQueryParam('sort')?.trim() || "score";
    const modifier = useQueryParam('sort')?.trim() === "_title_" ? "asc" : "desc";
    const pubhouses = useArrayQueryParam('pubhouses');
    const ugnps = useUGSNSearch();
    const profiles = useDirectionSearch();
    const disciplines = useDisciplinesSearch();
    const doi = useAdditional('doi');
    const bookShtamp = useAdditional('bookShtamp');

    const {
        data: {pagination: {rows = 0, start = 0, total: fetchedTotal = 0} = {}, data: books = []} = {},
        isPending,
        isPlaceholderData,
    } = useAllBook(
        {
            query: {value, by},
            filter: {pubyear, pubhouses, ugnps, pubtypes, profiles, doi, bookShtamp, disciplines, purposes, ...(isbn ? {isbn} : {})},
            sorts: [{field, modifier}]
        },
        {start: page * count, rows: count},
    );

    const downloadExcel = async (body: BookRepository.bookBody) => {
        await toast.promise(
            getExelBook(body).then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'books.xlsx';
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
            query: { value, by },
            filter: { pubyear, pubhouses, ugnps, profiles, disciplines, doi, bookShtamp, ...(isbn ? { isbn } : {}) },
            sorts: [{ field, modifier }],
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
                <SearchResultTextBook resultCount={total || 0}/>
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
                <SearchPage name="pub"/>
            </div>
            {isPending ? (
                <div className="row g-4">
                    {new Array(count).fill(null).map((_, i) => (
                        <BookSkeleton index={i} key={i}/>
                    ))}
                </div>
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
