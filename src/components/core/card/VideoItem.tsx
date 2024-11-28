import React from "react";
import {Video} from "../../../data/video/model/types";
import ShareButtons from "./ui/ShareButtons";
import ReactPlayer from "react-player";
import ReadMore from "./ui/ReadMore";

const VideoItem = ({ index, video }: { index: number, video: Video }) => {
    const formatText = (text) => {
        if (typeof text !== 'string') {
            if (text && typeof text === 'object') {
                text = JSON.stringify(text);
            } else {
                return '';
            }
        }
        text = text.replace(/^\[?"|"?\]$/g, '');

        const cleanedText = text.replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
        return cleanedText.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );
    };

    const removeHtmlEntities = (text) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    };


    return (
        <div className="card-item video position-relative">
            <div className="row g-3">
                <div className="col-xxl-4 col-xl-5">
                    <ReactPlayer
                        url={video.link}
                        width="250px"
                        height="140px"
                        controls
                        playing={false}
                    />
                </div>
                <div className="col-xxl-8 col-xl-7">
                    <a href={video.link} target="_blank" rel="noreferrer" className="text" dangerouslySetInnerHTML={{ __html: removeHtmlEntities(video.title)}}/>
                    <ReadMore content={formatText(video.description)} maxLines={3} />
                    <div className="d-flex flex-sm-row flex-column gap-3 justify-content-sm-between mt-4">
                        <a href={video.link} target="_blank" className="btn btn-primary btn-small" rel="noreferrer">Перейти к просмотру</a>
                        <ShareButtons title={removeHtmlEntities(video.title)} url={video.link} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoItem;
