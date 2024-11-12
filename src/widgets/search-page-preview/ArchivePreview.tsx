import ArchiveItem from "../../components/core/card/ArchiveItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useRemoveCategoriesFromUrl} from "../../hooks/useRemoveCategoriesFromUrl";
import {useAllArchive} from "../../data/archive/model/queries";
import React, {useMemo} from "react";
import {useLocation} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import {CATEGORIES_LABELS} from "../../data/consts";

export function ArchivePreview ({cat, index}:{cat:string, index:string}) {
    const location = useLocation();
    const query = useMemo(() => new URLSearchParams(location.search).get('query') || '', [location.search]);
    const queryBy = useMemo(() => {
        const searchParams = new URLSearchParams(location.search);
        const fields: ("title" | "description")[] = [];

        if (searchParams.get('title')) fields.push('title');
        if (searchParams.get('description')) fields.push('description');

        return fields;
    }, [location.search]);

    const {data:{data:archives = [],pagination:{total = 0} = {}} = {}} = useAllArchive({query, queryBy},{start: 0, rows: 10})
    const removeCategoriesFromUrl = useRemoveCategoriesFromUrl();
    return (
        <Accordion.Item key={cat} eventKey={index}>
            <Accordion.Header> {`${CATEGORIES_LABELS[cat]}:`} <span className="ps-2">{total}</span></Accordion.Header>
            <Accordion.Body className="me-3">
                <div className="row g-4">
                    {archives.slice(0, 3).map((archive, index) => (
                        <ArchiveItem key={archive.id} index={index + 1} archive={archive}/>
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