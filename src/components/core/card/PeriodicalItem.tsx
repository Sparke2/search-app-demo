import React from "react";
import {Periodical} from "../../../data/periodical/model/types";


const PeriodicalItem = ({index, periodical}: {index:number, periodical:Periodical}) =>{
    const numbers = periodical.numbers || [];

    return (
        <div className="card-item position-relative">
            <p className="text">
                <span className="pe-2">{index}.</span> {periodical.title}
            </p>
            <p>
                {Array.isArray(numbers) && numbers.map((number, index) => (
                    <span key={index} className="text-grey fw-600">
                        {number.year} год — №{number.issue}{index < numbers.length - 1 && ', '}
                    </span>
                ))}
            </p>
            {/*<p className="text-small fw-600">Организация практических занятий по курсу "Основы проектирования*/}
            {/*    информационных*/}
            {/*    систем"</p>*/}
            {/*<p className="text-small-grey justified">{periodical.publishers}*/}
            {/*    <span className="dots"></span>*/}
            {/*    Стр. 15-29*/}
            {/*</p>*/}
            <p className="text-small-grey desc">{periodical.description}</p>
            <div className="d-flex flex-wrap gap-3 mt-3">
                <button className="btn btn-primary btn-small equal">Читать</button>
                <a href={`https://www.iprbookshop.ru/${periodical.id}.html`} target="_blank" className="btn btn-outline-primary btn-small equal" rel="noreferrer">Подробнее о журнале</a>
            </div>
        </div>
    )
}


export default PeriodicalItem;