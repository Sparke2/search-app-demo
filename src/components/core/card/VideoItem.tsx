import React from "react";
import ReactPlayer from "react-player";
import ShareButtons from '../../ShareButtons';
import {Video} from "../../../data/video/model/types";

const VideoItem = ({ index, video }: { index: number, video: Video }) => {
    const formatText = (text) => {
        const cleanedText = text.replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
        const formattedText = cleanedText.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );
        return formattedText;
    };

    const removeHtmlEntities = (text) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    };


    return (
        <div className="card-item video position-relative">
            <div className="row">
                <div className="col-4">
                    <ReactPlayer
                        url={video.link}
                        width="250px"
                        height="140px"
                        controls
                        playing={false}
                    />
                </div>
                <div className="col-8">
                    <p className="text">{removeHtmlEntities(video.title)}</p>
                    <p className="text-small-grey desc" dangerouslySetInnerHTML={{ __html: formatText(video.description) }}/>
                    <div className="d-flex justify-content-between mt-4">
                        <a href={video.link} target="_blank" className="btn btn-primary btn-small" rel="noreferrer">Перейти к просмотру</a>
                        <ShareButtons title={removeHtmlEntities(video.title)} url={video.link} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoItem;
