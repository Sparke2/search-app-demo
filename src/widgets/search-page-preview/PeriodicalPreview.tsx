import PeriodicalItem from "../../components/core/card/PeriodicalItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useRemoveCategoriesFromUrl} from "../../hooks/useRemoveCategoriesFromUrl";
import {useAllPeriodical} from "../../data/periodical/model/queries";
import React from "react";
import Accordion from "react-bootstrap/Accordion";
import {CATEGORIES_LABELS} from "../../data/consts";
import {useQueryParam} from "../../hooks/useQueryParam";
import {useSearchAreaQueryParam} from "../../hooks/useSearchAreaQueryParam";

export function PeriodicalPreview ({cat, index}:{cat:string, index:string}) {
    const value = useQueryParam('query');
    const by = useSearchAreaQueryParam();

    const {data:{data:periodicals = [],pagination:{total = 0} = {}} = {}} = useAllPeriodical({query:{value,by}},{start: 0, rows: 10})
    const removeCategoriesFromUrl = useRemoveCategoriesFromUrl();
    return (
        <Accordion.Item key={cat} eventKey={index}>
            <Accordion.Header> {`${CATEGORIES_LABELS[cat]}:`} <span className="ps-2">{total}</span></Accordion.Header>
            <Accordion.Body className="me-3">
                <div className="row g-4">
                    {periodicals.slice(0, 3).map((periodical, index) => (
                        <PeriodicalItem key={periodical.id} index={index + 1} periodical={periodical}/>
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