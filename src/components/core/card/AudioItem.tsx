import React from "react";
import {AudioFilesModalRoot} from "../../../data/audio-files/ui/AudioFilesModal";
import {Audio} from "../../../data/audio/model/types";
import ReadMore from "./ui/ReadMore";

const AudioItem = ({index, audio}: { index: number, audio: Audio }) => {
    const executants = audio.executants || [];

    return (
        <div className="card-item position-relative">
            <div className="row g-3">
                <div className="col-xxl-6 col-md-5">
                    <p className="text"
                       dangerouslySetInnerHTML={{__html: `<span class="pe-2">${index}.</span> ${audio.title}`}}/>
                    <ReadMore content={audio.description} maxLines={2} />
                </div>
                <div className="col-md-2 col-sm-4">
                    <p className="text-grey">Время звучания</p>
                    <p className="text-small">{audio.recordtime}</p>
                </div>
                <div className="col-md-3 col-sm-4">
                    <p className="text-grey">Исполнители</p>
                    <p className="text-small">
                        {executants.map((executant, index) => (
                            <span key={index}>
                                {executant}{index < audio.executants.length - 1 && ', '}
                            </span>
                        ))}
                    </p>
                </div>
                <div className="col-xxl-1 col-md-2 col-sm-4">
                    <p className="text-grey">Год</p>
                    <p className="text-small">{audio.recordyear}</p>
                </div>
            </div>
            <div className="d-flex flex-wrap gap-3 mt-3">
                <AudioFilesModalRoot key={`audio-${audio.id}`} audio={audio}/>
            </div>
        </div>
    )
}
export default AudioItem;