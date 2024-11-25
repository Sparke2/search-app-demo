import React, {useState} from "react";

interface ReadMoreProps {
    content: string | string[];
    maxLines?: number;
    maxItems?: number;
    label?: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({
                                               content,
                                               maxLines = 3,
                                               maxItems = 3,
                                               label,
                                           }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const isArray = Array.isArray(content);

    return (
        <div>
            {isArray ? (
                <>
                    {
                        label === 'Издательство' ? (
                            <>
                                {label && <p className="text-grey">{label}: </p>}
                                <p className="text-small">
                                    {isExpanded
                                        ? content.map((item, index) => (
                                            <span key={index}> {item} {index < content.length - 1 && ", "}</span>
                                        ))
                                        : content.slice(0, maxItems).map((item, index) => (
                                            <span
                                                key={index}>{item} {index < Math.min(content.length, maxItems) - 1 && ", "}</span>
                                        ))}
                                    {content.length > maxItems && (
                                        <button
                                            onClick={toggleReadMore}
                                            style={{
                                                background: "none",
                                                color: "#70797d",
                                                fontSize: "14px",
                                                border: "none",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                                paddingLeft: "0"
                                            }}
                                        >
                                            {isExpanded ? "Скрыть" : `Ещё (${content.length - maxItems})`}
                                        </button>
                                    )}
                                </p>
                                </>
                                ) : (
                                <p className="m-0">
                                    {label && <span className="text-small-grey">{label}: </span>}
                                    {isExpanded
                                        ? content.map((item, index) => (
                                            <span className="text-prim"
                                                  key={index}> {item} {index < content.length - 1 && ", "}</span>
                                        ))
                                        : content.slice(0, maxItems).map((item, index) => (
                                            <span className="text-prim"
                                                  key={index}>{item} {index < Math.min(content.length, maxItems) - 1 && ", "}</span>
                                        ))}
                                    {content.length > maxItems && (
                                        <button
                                            onClick={toggleReadMore}
                                            style={{
                                                background: "none",
                                                color: "#70797d",
                                                fontSize: "14px",
                                                border: "none",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {isExpanded ? "Скрыть" : `Ещё (${content.length - maxItems})`}
                                        </button>
                                    )}
                                </p>)
                                }
                            </>
                        ) : (
                            <>
                    <p
                        className={`text-small-grey ${!isExpanded ? "line-clamp" : ""}`}
                        dangerouslySetInnerHTML={{__html: content}}
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: isExpanded ? "none" : maxLines,
                            WebkitBoxOrient: "vertical",
                            overflow: isExpanded ? "visible" : "hidden",
                            textOverflow: "ellipsis",
                        }}
                    />
                    {content.length > 0 && (
                        <button
                            onClick={toggleReadMore}
                            style={{
                                paddingLeft: "0",
                                fontSize: "14px",
                                fontWeight: "bold",
                                background: "none",
                                color: "#70797d",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            {isExpanded ? "Скрыть" : "Читать полностью"}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default ReadMore;
