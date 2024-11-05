import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {Button, ListGroup, Modal} from 'react-bootstrap';

const AudioFilesModal = ({ show, onHide, audioFiles }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="audio-files-modal" centered>
            <Modal.Header closeButton>
                <Modal.Title id="audio-files-modal">
                    Список аудиофайлов
                </Modal.Title>
                <Button type="button" className="btn close" onClick={onHide}>
                    <FontAwesomeIcon icon={faXmark}/>
                </Button>
            </Modal.Header>
            <Modal.Body>
                {audioFiles && audioFiles.length > 0 ? (
                    <ListGroup>
                        {audioFiles.map((file, index) => (
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AudioFilesModal;


