import React from "react";
import {Book} from "../../../data/book/model/types";

import {Button} from "primereact/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleQuestion} from "@fortawesome/free-regular-svg-icons";
import {Tooltip} from "primereact/tooltip";

const BookItem = ({index, book}: {index:number, book:Book}) =>{
    const authors = book.authors || [];
    const collections = book.collections || [];
    const pubhouse = book.pubhouses || [];
    return (
        <div className="card-item position-relative">
            <div className="row">
                <div className="col-8">
                    <p className="text">
                        <span className="pe-2">{index}.</span>
                        {authors.map((author, index) => (
                            <span key={index}>
                                {author}{index < book.authors.length - 1 && ', '}
                            </span>
                        ))}
                    </p>
                    <p className="text">{book.title}. {book.additTitle}</p>
                    {book.pubtype && (
                        <p className="text-small"><span className="text-small-grey">Тип:</span> {book.pubtype}</p>
                    )}
                    {collections.length > 0 && (
                        <p className="m-0"><span className="text-small-grey">Коллекция: </span>
                            {collections.map((collection, index) => (
                                <a key={index} href="#" /* eslint-disable-line jsx-a11y/anchor-is-valid */>
                                    {collection}{index < book.collections.length - 1 && ', '}
                                </a>
                            ))}
                        </p>
                    )}
                    <p className="text-small-grey desc">{book.description}</p>
                </div>
                <div className="col-1">
                    <p className="text-grey">Стр.</p>
                    <p className="text-small">{book.pageCount}</p>
                </div>
                <div className="col-2">
                    <p className="text-grey">Издательство</p>
                    <p className="text-small">
                        {pubhouse.map((pubhouse, index) => (
                            <span key={index}>
                                {pubhouse}{index < book.pubhouses.length - 1 && ', '}
                            </span>
                        ))}
                    </p>
                </div>
                <div className="col-1">
                    <p className="text-grey">Год</p>
                    <p className="text-small">{book.pubyear}</p>
                </div>
            </div>
            <div className="d-flex flex-wrap gap-3 mt-3">
                {/*<button className="btn btn-primary btn-small">Добавить в заказ • 3000 ₽</button>*/}
                <Tooltip target={`.btn-${book.id}`} className="custom-tooltip">
                    <p>Недоступно для чтения.</p>
                    <p>Для покупки нажмите кнопку <span>«Добавить в заказ»</span>.</p>
                    <p>Для просмотра содержания нажмите на кнопку</p>
                    <p><span>«Подробнее о книге»</span>.</p>
                </Tooltip>
                <Button className={`btn btn-disabled btn-${book.id} btn-small equal`}>
                    Читать <FontAwesomeIcon icon={faCircleQuestion} />
                </Button>
                {/*<a href={`https://www.iprbookshop.ru/${book.id}.html`} target="_blank" className="btn btn-primary btn-small equal">*/}
                {/*    Читать*/}
                {/*</a>*/}
                <a href={`https://www.iprbookshop.ru/${book.id}.html`} target="_blank" className="btn btn-outline-primary btn-small equal" rel="noreferrer">Подробнее о книге</a>
            </div>
        </div>
    )
}


export default BookItem;