import React from "react";
import {AudioFilesModalRoot} from "../../../data/audio-files/ui/AudioFilesModal";
import {Audio} from "../../../data/audio/model/types";

const AudioItem = ({index, audio}: { index: number, audio: Audio }) => {
    const executants = audio.executants || [];

    return (
        <div className="card-item position-relative">
            <div className="row">
                <div className="col-6">
                    <p className="text"><span className="pe-2">{index}.</span> {audio.title}</p>
                    <p className="text-small-grey desc">{audio.description}</p>
                </div>
                <div className="col-2">
                    <p className="text-grey">Время звучания</p>
                    <p className="text-small">{audio.recordtime}</p>
                </div>
                <div className="col-3">
                    <p className="text-grey">Исполнители</p>
                    <p className="text-small">
                        {executants.map((executant, index) => (
                            <span key={index}>
                                {executant}{index < audio.executants.length - 1 && ', '}
                            </span>
                        ))}
                    </p>
                </div>
                <div className="col-1">
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