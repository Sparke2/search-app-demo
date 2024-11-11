import React from 'react';
import {useAreaSearchArray} from "./useAreaSearchArray";

const SearchResultTextPeriodical = ({resultCount}) => {
    const searchArray = useAreaSearchArray();

    const renderText = () => {
        if (!searchArray.length || searchArray.length === 3) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в журналах:</span> {resultCount}
                </h5>
            );
        }

        if (searchArray.includes('description') && searchArray.includes('title')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в тексте и названиях журналов:</span> {resultCount}
                </h5>
            );
        }
        if (searchArray.includes('description') && searchArray.includes('author')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в тексте и авторах журналов:</span> {resultCount}
                </h5>
            );
        }

        if (searchArray.includes('title') && searchArray.includes('author')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в названиях и авторах журналов:</span> {resultCount}
                </h5>
            );
        }

        if (searchArray.includes('description')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в тексте журналов:</span> {resultCount}
                </h5>
            );
        }

        if (searchArray.includes('title')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в названиях журналов:</span> {resultCount}
                </h5>
            );
        }

        if (searchArray.includes('author')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в авторах журналов:</span> {resultCount}
                </h5>
            );
        }

        return null;
    };

    return renderText();
};

export default SearchResultTextPeriodical;
