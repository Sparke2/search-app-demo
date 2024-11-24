import React from "react";
import {Periodical} from "../../../data/periodical/model/types";
import ReadMore from "./ui/ReadMore";

const PeriodicalItem = ({index, periodical}: { index: number, periodical: Periodical }) => {
    const numbers: { year: number; issue: number }[] = periodical.numbers;
    const years = numbers.map(number => number.year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const totalIssues = numbers.length;

    return (
        <div className="card-item position-relative">
            <p className="text"
               dangerouslySetInnerHTML={{__html: `<span class="pe-2">${index}.</span> ${periodical.title}`}}/>
            <p className="text-grey fw-600">
                {minYear} год — {maxYear} год, количество номеров: {totalIssues}
            </p>
            <ReadMore content={periodical.description} maxLines={3} />
            <div className="d-flex flex-wrap gap-3 mt-3">
                <button className="btn btn-primary btn-small equal">Читать</button>
                <a href={`https://www.iprbookshop.ru/${periodical.id}.html`} target="_blank"
                   className="btn btn-outline-primary btn-small equal" rel="noreferrer">Подробнее о журнале</a>
            </div>
        </div>
    )
}


export default PeriodicalItem;