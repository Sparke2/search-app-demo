import React from 'react';
import {useAreaSearchArray} from "./useAreaSearchArray";

const SearchResultText = ({resultCount}) => {
    const searchArray = useAreaSearchArray();

    const renderText = () => {
        if (!searchArray.length || searchArray.length === 3) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в книгах:</span> {resultCount}
                </h5>
            );
        }

        if (searchArray.includes('description') && searchArray.includes('title')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в тексте и названиях книг:</span> {resultCount}
                </h5>
            );
        }
        if (searchArray.includes('description') && searchArray.includes('author')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в тексте и авторах книг:</span> {resultCount}
                </h5>
            );
        }

        if (searchArray.includes('title') && searchArray.includes('author')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в названиях и авторах книг:</span> {resultCount}
                </h5>
            );
        }

        if (searchArray.includes('description')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в тексте книг:</span> {resultCount}
                </h5>
            );
        }

        if (searchArray.includes('title')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в названиях книг:</span> {resultCount}
                </h5>
            );
        }

        if (searchArray.includes('author')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в авторах книг:</span> {resultCount}
                </h5>
            );
        }

        return null;
    };

    return renderText();
};

export default SearchResultText;
