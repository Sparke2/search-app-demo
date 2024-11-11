import BookItem from "../../components/core/card/BookItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useRemoveCategoriesFromUrl} from "../../hooks/useRemoveCategoriesFromUrl";
import {useAllBook} from "../../data/book/model/queries";
import {useMemo} from "react";
import {useLocation} from "react-router-dom";

export function BookPreview () {
    const location = useLocation();
    const query = useMemo(() => new URLSearchParams(location.search).get('query') || '', [location.search]);
    const queryBy = useMemo(() => {
        const searchParams = new URLSearchParams(location.search);
        const fields: ("title" | "description")[] = [];

        if (searchParams.get('title')) fields.push('title');
        if (searchParams.get('description')) fields.push('description');

        return fields;
    }, [location.search]);


    const {data:{data:books = [],pagination:{total = 0} = {}} = {}} = useAllBook({query, queryBy},{start: 0, rows: 10})
    const removeCategoriesFromUrl = useRemoveCategoriesFromUrl();
    return (
        <>
            <div className="row g-4">
                {books.slice(0,3).map((book, index) => (
                    <BookItem key={book.id} index={index + 1} book={book}/>
                ))}
            </div>
            <button
                className="btn more-results"
                onClick={() => removeCategoriesFromUrl('searchBooks')}
            >
                Еще результаты ({total}) <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </>
    );
}