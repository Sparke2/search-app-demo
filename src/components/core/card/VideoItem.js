import React from "react";
import ShareButtons from '../../ShareButtons';

const VideoItem = () =>
    <div className="card-item video position-relative">
        <div className="position-absolute number-card text">1.</div>
        <div className="row">
            <div className="col-4">
                <iframe width="250" height="140" src="https://www.youtube.com/embed/CDD0Qt-x44o?si=k4BLe6mbLIqM39hZ"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            <div className="col-8">
                <p className="text">Торжественная церемония открытия XVI Европейского правового конгресса 2 июля в
                    Кремле!</p>
                <p className="text-small-grey desc">В учебном пособии рассматриваются основные проблемы права,
                    а именно: какую роль играет право в условиях глобализации, какое место занимает общая теория права в
                    системе юридических наук. </p>
                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-primary btn-small">Перейти к просмотру</button>
                    <ShareButtons title="Торжественная церемония открытия XVI Европейского правового конгресса 2 июля в
                    Кремле!" url="https://www.youtube.com/embed/CDD0Qt-x44o?si=k4BLe6mbLIqM39hZ"/>
                </div>
            </div>
        </div>
    </div>;
export default VideoItem;
