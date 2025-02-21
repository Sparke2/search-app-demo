import React, {useEffect, useRef, useState} from "react";

interface ReadMoreProps {
    content: string;
    maxLines?: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ content, maxLines = 3 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textRef.current) {
            const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight, 10);
            const maxHeight = maxLines * lineHeight;
            setIsOverflowing(textRef.current.scrollHeight > maxHeight);
        }
    }, [content, maxLines]);

    return (
        <div
            style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div
                ref={textRef}
                className="text-small-grey mb-3"
                style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: isExpanded ? "unset" : maxLines,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: "1.5em",
                }}
                dangerouslySetInnerHTML={{ __html: content }}
            >
            </div>
        </div>
    );
};

export default ReadMore;