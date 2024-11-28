import React, {useState} from "react";

interface ReadMoreProps {
    authors: string[];
    maxItems?: number;
    label?: string;
}

export const ReadMoreAuthors: React.FC<ReadMoreProps> = ({
                                                             authors,
                                                             maxItems = 3,
                                                             label = "Авторы",
                                                         }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const authorsHTML = authors
        .map((author, index) =>
            `<span class="text-grey">${author}${index < authors.length - 1 ? ", " : ""}</span>`
        )
        .join("");

    const limitedAuthorsHTML = authors
        .slice(0, maxItems)
        .map((author, index) =>
            `<span class="text-grey">${author}${index < Math.min(authors.length, maxItems) - 1 ? ", " : ""}</span>`
        )
        .join("");

    return (
        <div className="d-flex flex-wrap">
            <p
                className="text m-0"
                dangerouslySetInnerHTML={{
                    __html: isExpanded ? authorsHTML : limitedAuthorsHTML,
                }}
            />
            {authors.length > maxItems && (
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
                    {isExpanded ? "Скрыть" : `Ещё (${authors.length - maxItems})`}
                </button>
            )}
        </div>
    );
};
