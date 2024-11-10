import React, {useMemo, useState} from "react";
import {useAllBook} from "../../data/book/model/queries";
import {Skeleton} from "@mui/material";
import BookItem from "../../components/core/card/BookItem";
import ReactSelect from "../../components/ReactSelect";
import {useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {faFileExcel} from "@fortawesome/free-regular-svg-icons";
import SearchResultText from "../../hooks/SearchResultText";

export function SearchBooks() {
    const location = useLocation();
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(10);

    const query = useMemo(() => new URLSearchParams(location.search).get('query') || '', [location.search]);
    const queryBy = useMemo(() => {
        const searchParams = new URLSearchParams(location.search);
        const fields: ("title" | "description")[] = [];

        if (searchParams.get('title')) fields.push('title');
        if (searchParams.get('description')) fields.push('description');

        return fields;
    }, [location.search]);

    const {
        data,
        isPending,
        isFetching,
        isPlaceholderData,
    } = useAllBook({query, queryBy}, {start: page + 1, rows: count});

    return (
        <div className="pe-4">
            <div className="d-flex justify-content-between align-items-center mb-4 search-header">
                <SearchResultText resultCount={233}/>
                <button className="btn btn-outline-primary px-4">
                    <FontAwesomeIcon icon={faFileExcel} className="pe-2"/> Экспорт в Excel
                </button>
            </div>
            <div className="d-flex justify-content-between mb-5">
                <div className="d-flex gap-4 align-items-center">
                    <span className="paginate-text">Элементов на странице:</span>
                    <ReactSelect
                        shouldApplyButtonRender={false}
                        options={[{value: 10, label: '10'}, {value: 25, label: '25'}, {value: 50, label: '50'}, {
                            value: 100,
                            label: '100'
                        }]}
                        defaultValue={count}
                        placeholder={10}
                        onChange={({value}) => {
                            setCount(value);
                        }}
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
                            { value: 'yearSort', label: 'году' }
                        ]}
                        defaultValue={{ value: 'newSort', label: 'новизне' }}
                        placeholder={'новизне'}
                    />

                </div>
            </div>
            {isPending ? (
                new Array(count).fill(null).map((_, i) => (
                    <Skeleton style={{width: '100%', height: 30}} key={i}/>
                ))
            ) : (
                <div className="row g-4">
                    {data?.map((book, index) => (
                        <div className="col-12" key={book.id}>
                            <BookItem index={(page * count) + index + 1} book={book}/>
                        </div>
                    ))}
                </div>
            )}
            <div className='d-flex justify-content-between align-items-center pt-4'>
                <div className="d-flex gap-4 flex-col align-items-center btn-paginate">
                    <div>
                        <button className="btn"
                                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                                disabled={page === 0}
                        >
                            <FontAwesomeIcon icon={faChevronLeft}/>
                        </button>
                        <button className="btn"
                                onClick={() => {
                                    if (!isPlaceholderData && data) {
                                        setPage((old) => old + 1);
                                    }
                                }}
                                disabled={isPlaceholderData || !data}
                        >
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </button>
                    </div>
                    <span
                        className="paginate-text">{page * count + 1} - {(count * page) + count} из {data?.count || 0}</span>
                </div>

                <div className="d-flex gap-4 flex-col align-items-center">
                    <span className="paginate-text">Элементов на странице:</span>
                    <ReactSelect
                        shouldApplyButtonRender={false}
                        options={[{value: 10, label: '10'}, {value: 25, label: '25'}, {value: 50, label: '50'}, {
                            value: 100,
                            label: '100'
                        }]}
                        defaultValue={count}
                        placeholder={10}
                        onChange={({value}) => {
                            setCount(value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
