import React from "react";
import {Tooltip} from "primereact/tooltip";

interface ReadMoreProps {
    authors: string[];
    maxItems?: number;
}

const getAuthorsEnding = (count: number) => {
    if (count % 10 === 1 && count % 100 !== 11) return "автор";
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return "автора";
    return "авторов";
};

export const ReadMoreAuthors: React.FC<ReadMoreProps> = ({ authors, maxItems = 2 }) => {
    const authorList = authors.length > 0 ? authors[0].split(",").map(a => a.trim()) : [];

    if (authorList.length <= maxItems) {
        return (
            <p className="text m-0">
                <span className="text-grey-50" dangerouslySetInnerHTML={{ __html: authorList.join(", ") }} />
            </p>
        );
    }

    const remainingCount = authorList.length - maxItems;
    const displayedAuthors = authorList.slice(0, maxItems).join(", ");
    const hiddenAuthors = authorList.slice(maxItems).join(", ");

    return (
        <div className="d-flex flex-wrap">
            <p className="text m-0">
                <span className="text-grey-50" dangerouslySetInnerHTML={{ __html: displayedAuthors }} />
                <span
                    data-pr-tooltip={hiddenAuthors}
                    data-pr-position="top"
                    className="text-grey-50 text-decoration-none"
                    style={{ cursor: "pointer", textDecoration: "underline", marginLeft: "5px" }}
                >
                    + <span className="hover-primary" dangerouslySetInnerHTML={{ __html: `ещё ${remainingCount} ${getAuthorsEnding(remainingCount)}` }} />
                </span>
                <Tooltip target="[data-pr-tooltip]" className="custom-tooltip" />
            </p>
        </div>
    );
};
