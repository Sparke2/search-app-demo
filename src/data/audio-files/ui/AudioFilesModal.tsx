import React, {memo, useEffect, useRef, useState} from 'react';
import {useAllAudioFiles} from "../model/queries";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {ListGroup} from "react-bootstrap";
import {Audio} from "../../audio/model/types";

export const AudioFilesModalRoot = memo(({audio}: { audio: Audio }) => {
    const [isModalAudioFilesOpen, setModalAudioFilesOpen] = useState(false);
    const toggle = () => {
        setModalAudioFilesOpen(v => !v);
    };

    return (
        <>
            <button onClick={toggle} className="btn btn-primary btn-small">
                Перейти к прослушиванию
            </button>
            <AudioFilesModal isOpen={isModalAudioFilesOpen} toggleModal={toggle} audio={audio}/>
        </>
    );
});
const AudioFilesModal = ({isOpen, toggleModal, audio}: {
    isOpen: boolean,
    toggleModal: () => void,
    audio: Audio;
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
    const executants = audio.executants || [];
    const geners = audio.genres || [];
    const pubhouses = audio.pubhouses || [];

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
                                        <h4>{audio.title}</h4>
                                        <div className="row g-3">
                                            <div className="col-4">Авторы</div>
                                            <div className="col-8">
                                                {executants.map((executant, index) => (
                                                    <span key={index}>
                                                        {executant}{index < audio.executants.length - 1 && ', '}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-4">Аннотация</div>
                                            <div className="col-8">{audio.description}</div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-4">Назначение</div>
                                            <div className="col-8"></div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-4">Жанры</div>
                                            <div className="col-8">
                                                {geners.map((genres, index) => (
                                                    <span key={index}>
                                                        {genres}{index < audio.genres.length - 1 && ', '}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-4">Издательство</div>
                                            <div className="col-8">
                                                {pubhouses.map((pubhous, index) => (
                                                    <span key={index}>
                                                        {pubhous}{index < audio.pubhouses.length - 1 && ', '}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-4">Исполнители</div>
                                            <div className="col-8">
                                                {executants.map((executant, index) => (
                                                    <span key={index}>
                                                        {executant}{index < audio.executants.length - 1 && ', '}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-4">Год записи</div>
                                            <div className="col-8">{audio.recordyear}</div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-4" style={{borderBottom: 'none'}}>Время звучания</div>
                                            <div className="col-8" style={{borderBottom: 'none'}}>{audio.recordtime}</div>
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
                                                            <source src={file.url} type="audio/mpeg"/>
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


