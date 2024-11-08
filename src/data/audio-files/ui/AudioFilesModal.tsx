import React, {memo, useEffect, useRef, useState} from 'react';
import {useAllAudioFiles} from "../model/queries";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useCurrentAudioFiles} from "../model/hooks";
import {ListGroup} from "react-bootstrap";

export const AudioFilesModalRoot = memo(() => {
    const [isModalAudioFilesOpen, setModalAudioFilesOpen] = useState(false);
    const toggle = () => {
        setModalAudioFilesOpen(v => !v)
    }
    const {audioFiles} = useCurrentAudioFiles()
    const {data} = useAllAudioFiles(!!audioFiles.length)
    return <>
        <button onClick={toggle} className="btn btn-primary btn-small">Перейти к прослушиванию</button>
        <AudioFilesModal isOpen={isModalAudioFilesOpen} toggleModal={toggle}/>
    </>


})
const AudioFilesModal = ({isOpen, toggleModal}: {
    isOpen: boolean,
    toggleModal: () => void;
}) => {
    const {data: NodesAudioFiles = []} = useAllAudioFiles()

    const modalRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                toggleModal();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleModal]);


    if (!isOpen) return null;

    return (
        <>
            <div className="modal audio-files fade show" style={{display: 'block'}} tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-xl" role="document" ref={modalRef}>
                    <div className="modal-content">
                        <div className="modal-header justify-content-end">
                            <button type="button" className="btn close" onClick={toggleModal}>
                                <FontAwesomeIcon icon={faXmark}/>
                            </button>
                        </div>
                        <div className="modal-body px-3">
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="ind-block">
                                        <h4>10 класс. Литература</h4>
                                        <div className="row g-3">
                                            <div className="col-4">Авторы</div>
                                            <div className="col-8">Булгаков М.А., Васильев Б.Л., Гоголь Н.В., Гончаров
                                                И.А., Достоевский Ф.М., Лесков Н.С., Оноре де Бальзак, Салтыков-Щедрин
                                                М.Е., Толстой А.Н., Толстой Л.Н., Тургенев И.С., Чехов А.П., Чингиз
                                                Торекулович Айматов
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-4">Аннотация</div>
                                            <div className="col-8">Издание содержит краткое изложение художественных
                                                произведений по программе литературы за 10 класс.
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-4">Назначение</div>
                                            <div className="col-8">Учебная литература</div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-4">Жанры</div>
                                            <div className="col-8">Зарубежная классика, Русская классическая проза,
                                                Учебная литература
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-4">Издательство</div>
                                            <div className="col-8">ИДДК</div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-4">Исполнители</div>
                                            <div className="col-8">Серебрянская В.</div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-4">Год записи</div>
                                            <div className="col-8">2007</div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-4" style={{ borderBottom: 'none' }}>Время звучания</div>
                                            <div className="col-8" style={{ borderBottom: 'none' }}>6:43:16</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h6>Список доступных для прослушивания аудиофайлов</h6>
                                    {NodesAudioFiles && NodesAudioFiles.length > 0 ? (
                                        <ListGroup>
                                            {NodesAudioFiles.map((file, index) => (
                                                <ListGroup.Item key={index}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span>{file.name}</span>
                                                        <audio controls>
                                                            <source src={file.url} type="audio/mpeg" />
                                                            Ваш браузер не поддерживает элемент audio.
                                                        </audio>
                                                    </div>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    ) : (
                                        <p>Аудиофайлы отсутствуют.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={toggleModal}>
                                Закрыть окно
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
};


