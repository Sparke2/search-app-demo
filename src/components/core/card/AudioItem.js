import React from "react";
const AudioItem = () =>
    <div className="card-item position-relative">
        <div className="position-absolute number-card text">1.</div>
        <div className="row">
            <div className="col-6">
                <p className="text">Теория права</p>
                <p className="text-small-grey desc">В учебном пособии рассматриваются основные проблемы права,
                    а именно: какую роль играет право в условиях глобализации, какое место занимает общая теория права в системе юридических наук. </p>
            </div>
            <div className="col-2">
                <p className="text-grey">Время звучания</p>
                <p className="text-small">6:43:16</p>
            </div>
            <div className="col-3">
                <p className="text-grey">Исполнители</p>
                <p className="text-small">Серебрянская В.</p>
            </div>
            <div className="col-1">
                <p className="text-grey">Год</p>
                <p className="text-small">2024</p>
            </div>
        </div>
        <div className="d-flex flex-wrap gap-3 mt-3">
            <button className="btn btn-primary btn-small">Перейти к прослушиванию</button>
        </div>
    </div>;
export default AudioItem;