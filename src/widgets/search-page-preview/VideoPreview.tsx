import VideoItem from "../../components/core/card/VideoItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useRemoveCategoriesFromUrl} from "../../hooks/useRemoveCategoriesFromUrl";
import {useAllVideo} from "../../data/video/model/queries";
import React from "react";
import Accordion from "react-bootstrap/Accordion";
import {CATEGORIES_LABELS} from "../../data/consts";
import {useQueryParam} from "../../hooks/useQueryParam";
import {useSearchAreaQueryParam} from "../../hooks/useSearchAreaQueryParam";
import {useArrayQueryParam} from "../../hooks/useArrayQueryParam";

export function VideoPreview ({cat, index}:{cat:string, index:string}) {
    const value = useQueryParam('query');
    const by = useSearchAreaQueryParam();
    const channels = useArrayQueryParam('channel');

    const {data:{data:videos = [],pagination:{total = 0} = {}} = {}} = useAllVideo({query:{value,by}, filter: {channels}},{start: 0, rows: 10})
    const removeCategoriesFromUrl = useRemoveCategoriesFromUrl();
    return (
        <Accordion.Item key={cat} eventKey={index}>
            <Accordion.Header> {`${CATEGORIES_LABELS[cat]}:`} <span className="ps-2">{total}</span></Accordion.Header>
            <Accordion.Body className="me-3">
                <div className="row g-4">
                    {videos.slice(0, 3).map((video, index) => (
                        <VideoItem key={video.id} index={index + 1} video={video}/>
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