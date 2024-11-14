import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

export default function Pagination({page, setPage, hasMore, isPlaceholderData, total, count}) {
    return (
        <div className="d-flex gap-4 flex-col align-items-center btn-paginate">
            <div>
                <button
                    className="btn"
                    onClick={() => setPage((old) => Math.max(old - 1, 0))}
                    disabled={page === 0}
                >
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </button>
                <button
                    className="btn"
                    onClick={() => {
                        if (!isPlaceholderData && hasMore) {
                            setPage((old) => old + 1);
                        }
                    }}
                    disabled={isPlaceholderData || !hasMore}
                >
                    <FontAwesomeIcon icon={faChevronRight}/>
                </button>
            </div>
            <span className="paginate-text">
                {page * count + 1} - {Math.min((page + 1) * count, total)} из {total || 0}
            </span>
        </div>
    );
}
