import BookItem from "../../components/core/card/BookItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useRemoveCategoriesFromUrl} from "../../hooks/useRemoveCategoriesFromUrl";

export function BookPreview () {
    const removeCategoriesFromUrl = useRemoveCategoriesFromUrl();
    return (
        <>
            <div className="row g-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div className="col-12" key={index}>
                        <BookItem index={index} />
                    </div>
                ))}
            </div>
            <button
                className="btn"
                onClick={() => removeCategoriesFromUrl('searchBooks')}
            >
                Еще результаты (0) <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </>
    );
}