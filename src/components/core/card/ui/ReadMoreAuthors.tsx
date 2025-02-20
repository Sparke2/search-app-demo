import React from "react";
import {Tooltip} from "primereact/tooltip";

interface ReadMoreProps {
    authors: string[]; // authors приходит как ["Автор1, Автор2, Автор3"]
    maxItems?: number;
}

const getAuthorsEnding = (count: number) => {
    if (count % 10 === 1 && count % 100 !== 11) return "автор";
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return "автора";
    return "авторов";
};

export const ReadMoreAuthors: React.FC<ReadMoreProps> = ({
                                                             authors,
                                                             maxItems = 2,
                                                         }) => {
    // Разбиваем строку на массив
    const authorList = authors.length > 0 ? authors[0].split(",").map(a => a.trim()) : [];

    if (authorList.length <= maxItems) {
        return <p className="text m-0"><span className="text-grey-50">{authorList.join(", ")}</span></p>;
    }

    const remainingCount = authorList.length - maxItems;
    const displayedAuthors = authorList.slice(0, maxItems).join(", ");
    const hiddenAuthors = authorList.slice(maxItems).join(", ");

    return (
        <div className="d-flex flex-wrap">
            <p className="text m-0">
                <span className="text-grey-50">{displayedAuthors}</span>
                <span
                    data-pr-tooltip={hiddenAuthors}
                    data-pr-position="top"
                    className="text-grey-50 text-decoration-none"
                    style={{ cursor: "pointer", textDecoration: "underline", marginLeft: "5px" }}
                >
                    + <span className="hover-primary">ещё {remainingCount} {getAuthorsEnding(remainingCount)}</span>
                </span>
                <Tooltip target="[data-pr-tooltip]" className="custom-tooltip" />
            </p>
        </div>
    );
};
