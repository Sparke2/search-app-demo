import React from "react";

const ArchiveItem = () =>
    <div className="card-item position-relative">
        <div className="position-absolute number-card text">1.</div>
        <div className="row">
            <div className="col-10">
                <p className="text">К вопросу правового районирования Иваново-Вознесенской губернии</p>
                <p className="text-grey">Костромская ученая архивная комиссия</p>
            </div>
            <div className="col-1">
                <p className="text-grey">Год</p>
                <p className="text-small">1927</p>
            </div>
            <div className="col-1">
                <p className="text-grey">Стр.</p>
                <p className="text-small">152</p>
            </div>
        </div>
        <div className="d-flex flex-wrap gap-3 mt-3">
            <button className="btn btn-primary btn-small">Перейти к просмотру</button>
        </div>
    </div>;
export default ArchiveItem;