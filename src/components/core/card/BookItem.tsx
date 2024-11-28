import React from "react";
import {Book} from "../../../data/book/model/types";

import {Button} from "primereact/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleQuestion} from "@fortawesome/free-regular-svg-icons";
import {Tooltip} from "primereact/tooltip";
import ReadMore from "./ui/ReadMore";
import {ReadMoreAuthors} from "./ui/ReadMoreAuthors";

const BookItem = ({index, book}: { index: number, book: Book }) => {
    const authors = book.authors || [];
    const collections = book.collections || [];
    const pubhouse = book.pubhouses || [];
    return (
        <div className="card-item position-relative">
            <div className="row g-3">
                <div className="col-xxl-8 col-xl-7 col-12">
                    <p className="text">
                        <span className="pe-2">{index}.</span>
                        <span className="text"
                              dangerouslySetInnerHTML={{__html: `${book.title}. ${book.additTitle}`}}/>
                    </p>
                    <ReadMoreAuthors authors={authors}/>
                    {book.pubtype && (
                        <p className="text-small"><span className="text-small-grey">Тип:</span> {book.pubtype}</p>
                    )}
                    <ReadMore
                        content={collections}
                        maxItems={3}
                        label="Коллекция"
                    />
                    <ReadMore content={book.description} maxLines={2} />
                </div>
                <div className="col-xl-1 col-sm-4 col-3">
                    <p className="text-grey">Стр.</p>
                    <p className="text-small">{book.pageCount}</p>
                </div>
                <div className="col-xxl-2 col-xl-3 col-sm-4 col-6">
                    <ReadMore
                        content={pubhouse}
                        maxItems={3}
                        label="Издательство"
                    />
                </div>
                <div className="col-xl-1 col-sm-4 col-3">
                    <p className="text-grey">Год</p>
                    <p className="text-small">{book.pubyear}</p>
                </div>
            </div>
            <div className="d-flex flex-sm-row flex-column flex-wrap gap-3 mt-3">
                {/*<button className="btn btn-primary btn-small">Добавить в заказ • 3000 ₽</button>*/}
                <Tooltip target={`.btn-${book.id}`} className="custom-tooltip">
                    <p>Недоступно для чтения.</p>
                    <p>Для покупки нажмите кнопку <span>«Добавить в заказ»</span>.</p>
                    <p>Для просмотра содержания нажмите на кнопку</p>
                    <p><span>«Подробнее о книге»</span>.</p>
                </Tooltip>
                <Button className={`btn btn-disabled btn-${book.id} btn-small equal`}>
                    Читать <FontAwesomeIcon icon={faCircleQuestion}/>
                </Button>
                {/*<a href={`https://www.iprbookshop.ru/${book.id}.html`} target="_blank" className="btn btn-primary btn-small equal">*/}
                {/*    Читать*/}
                {/*</a>*/}
                <a href={`https://www.iprbookshop.ru/${book.id}.html`} target="_blank"
                   className="btn btn-outline-primary btn-small equal" rel="noreferrer">Подробнее о книге</a>
            </div>
        </div>
    )
}


export default BookItem;