import React, {useRef, useState} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Book} from "../../../data/book/model/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReadMore from "./ui/ReadMore";
import {ReadMoreAuthors} from "./ui/ReadMoreAuthors";
import {faArrowUpFromBracket, faHeart as HeartIconSolid, faStar} from "@fortawesome/free-solid-svg-icons";
import book_cover from '../../../img/book_cover.svg';
import {faHeart as HeartIcon} from "@fortawesome/free-regular-svg-icons";
import ShareButtonsBook from "./ui/ShareButtonsBook";

const BookItem = ({index, book}: { index: number, book: Book }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [toastId, setToastId] = useState(null);
    const authors = book.authors || [];
    const pubhouse = book.pubhouses || [];
    const modalRef = useRef<HTMLDivElement | null>(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleFavorite = () => {
        setIsFavorite(prev => {
            const newState = !prev;
            if (toastId) {
                toast.dismiss(toastId);
            }
            const newToastId = toast.success(newState ? "Добавлено в избранное!" : "Удалено из избранного!");
            setToastId(newToastId);

            return newState;
        });
    };

    return (
        <div className="card-item position-relative">
            <div className="d-flex flex-sm-row flex-column gap-3">
                <div className="mx-auto">
                    <img src={book.image || book_cover} alt={book.title} className="book-image"/>
                </div>
                <div className="d-flex flex-column">
                    <div className="d-flex gap-3 justify-content-between">
                        <a className="text-book" href={`https://www.iprbookshop.ru/${book.id}.html`} target="_blank"
                           rel="noreferrer">
                            <span className="text"
                                  dangerouslySetInnerHTML={{__html: `${book.title}. ${book.additTitle}`}}/>
                        </a>
                        <div className="d-flex gap-3 icons-book">
                            <button className="btn p-0" onClick={toggleModal}>
                                <FontAwesomeIcon
                                    className={`fs-20 ${isModalOpen ? 'text-primary-smart' : 'text-grey-50'}`}
                                    icon={faArrowUpFromBracket}
                                />
                            </button>
                            <button className="btn p-0" onClick={toggleFavorite}>
                                <FontAwesomeIcon
                                    className={`fs-20 ${isFavorite ? "text-red" : "text-grey-50"}`}
                                    icon={isFavorite ? HeartIconSolid : HeartIcon}
                                />
                            </button>
                        </div>
                    </div>
                    {book.pubtype && (
                        <p className="text-small text-main mt-2"><span
                            className="text-small-grey">Тип:</span> {book.pubtype}</p>
                    )}
                    <div className="d-flex flex-wrap justify-content-between">
                        <ReadMoreAuthors authors={authors} maxItems={2}/>
                        <div className="d-flex gap-3 align-items-center">
                            <p className="text m-0"><span className="text-grey-50">•</span></p>
                            <p className="text m-0"><span className="text-grey-50">{book.pubyear} г.</span></p>
                            <p className="text m-0"><span className="text-grey-50">•</span></p>
                            <p className="text m-0"><span className="text-grey-50">{book.pageCount} стр.</span></p>
                        </div>
                    </div>
                    <p className="text-small text-main mt-1"><span
                        className="text-small-grey">Издательство:</span> {pubhouse}</p>
                    <p className="text mb-1 d-flex align-items-center fs-16">
                        <FontAwesomeIcon icon={faStar}
                                         className="text-primary-smart fs-15 me-1"/> {book.raiting ? book.raiting : "5.0"}
                    </p>
                    <ReadMore content={book.description} maxLines={3}/>
                    <div className="d-flex flex-sm-row flex-column flex-wrap gap-3 mt-sm-auto mt-3">
                        <a href={`https://www.iprbookshop.ru/${book.id}.html`} target="_blank"
                           className="btn btn-outline-primary btn-small equal" rel="noreferrer">Читать</a>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <>
                    <div className="modal fade show" style={{display: "block"}} tabIndex={-1} role="dialog"
                         onClick={toggleModal}>
                        <div className="modal-dialog modal-md modal-dialog-centered" role="document" ref={modalRef}>
                            <div className="modal-content p-4" onClick={(e) => e.stopPropagation()}>
                                <p className="fs-20 fw-600 text-main mb-4">Поделиться в...</p>
                                <ShareButtonsBook title={book.title}
                                                  url={`https://www.iprbookshop.ru/${book.id}.html`}/>
                                <button onClick={toggleModal}
                                        className="btn btn-outline-primary btn-small px-8 mt-4 mx-auto">Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </div>
    );
};

export default BookItem;
