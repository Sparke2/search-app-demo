import React from "react";

const PeriodicalItem = () =>
    <div className="card-item position-relative">
        <p className="text"><span className="pe-2">1.</span> Научно-методический электронный журнал «Концепт права»</p>
        <p className="text-grey fw-600">2024 год, №1</p>
        <p className="text-small fw-600">Организация практических занятий по курсу "Основы проектирования информационных
            систем"</p>
        <p className="text-small-grey justified">Самохвалов Алексей Эдуардович, Samokhvalov Alexey E.
            <span className="dots"></span>
            Стр. 15-29
        </p>
        <p className="text-small-grey desc">В учебном пособии рассматриваются основные проблемы права,
            а именно: какую роль играет право в условиях глобализации, какое место занимает общая теория права в системе
            юридических наук. </p>
        <div className="d-flex flex-wrap gap-3 mt-3">
            <button className="btn btn-primary btn-small equal">Читать</button>
            <button className="btn btn-outline-primary btn-small equal">Подробнее о журнале</button>
        </div>
    </div>;
export default PeriodicalItem;