import BookItem from "../../components/core/card/BookItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useRemoveCategoriesFromUrl} from "../../hooks/useRemoveCategoriesFromUrl";
import {useAllBook} from "../../data/book/model/queries";
import React from "react";
import Accordion from "react-bootstrap/Accordion";
import {CATEGORIES_LABELS} from "../../data/consts";
import {useQueryParam} from "../../hooks/useQueryParam";
import {useSearchAreaQueryParam} from "../../hooks/useSearchAreaQueryParam";

export function BookPreview ({cat, index}:{cat:string, index:string}) {
    const value = useQueryParam('query');
    const by = useSearchAreaQueryParam();

    const {data:{data:books = [],pagination:{total = 0} = {}} = {}} = useAllBook({query:{value,by}},{start: 0, rows: 10})
    const removeCategoriesFromUrl = useRemoveCategoriesFromUrl();
    return (
        <Accordion.Item key={cat} eventKey={index}>
            <Accordion.Header> {`${CATEGORIES_LABELS[cat]}:`} <span className="ps-2">{total}</span></Accordion.Header>
            <Accordion.Body className="me-3">
                <div className="row g-4">
                    {books.slice(0, 3).map((book, index) => (
                        <BookItem key={book.id} index={index + 1} book={book}/>
                    ))}
                </div>
                <button
                    className="btn more-results"
                    onClick={() => removeCategoriesFromUrl(cat)}
                >
                    Еще результаты ({total}) <FontAwesomeIcon icon={faChevronRight}/>
                </button>
            </Accordion.Body>
        </Accordion.Item>

    );
}