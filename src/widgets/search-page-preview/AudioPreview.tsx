import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useRemoveCategoriesFromUrl} from "../../hooks/useRemoveCategoriesFromUrl";
import React from "react";
import Accordion from "react-bootstrap/Accordion";
import {CATEGORIES_LABELS} from "../../data/consts";
import {useAllAudio} from "../../data/audio/model/queries";
import AudioItem from "../../components/core/card/AudioItem";
import {useQueryParam} from "../../hooks/useQueryParam";
import {useSearchAreaQueryParam} from "../../hooks/useSearchAreaQueryParam";
import {useArrayQueryParam} from "../../hooks/useArrayQueryParam";
import {useCheckboxQueryParams} from "../../hooks/useCheckboxQueryParams";

export function AudioPreview ({cat, index}:{cat:string, index:string}) {
    const value = useQueryParam('query');
    const by = useSearchAreaQueryParam();
    const executants = useArrayQueryParam('performers');
    const collections = useCheckboxQueryParams('collection');
    const pubhouses = useArrayQueryParam('pubhouses');
    const genres = useCheckboxQueryParams('genre');
    const recordyear = [Number(useQueryParam('fromYear')), Number(useQueryParam('toYear'))];

    const {data:{data:audios = [],pagination:{total = 0} = {}} = {}} = useAllAudio({query:{value,by}, filter: {executants, pubhouses, genres, recordyear, collections},},{start: 0, rows: 10})
    const removeCategoriesFromUrl = useRemoveCategoriesFromUrl();
    return (
        <Accordion.Item key={cat} eventKey={index}>
            <Accordion.Header> {`${CATEGORIES_LABELS[cat]}:`} <span className="ps-2">{total}</span></Accordion.Header>
            <Accordion.Body className="me-3">
                <div className="row g-4">
                    {audios.slice(0, 3).map((audio, index) => (
                        <AudioItem key={audio.id} index={index + 1} audio={audio}/>
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