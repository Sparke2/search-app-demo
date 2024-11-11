import React from 'react';
import {useAreaSearchArray} from "./useAreaSearchArray";

const SearchResultTextVideo = ({resultCount}) => {
    const searchArray = useAreaSearchArray();

    const renderText = () => {
        if (!searchArray.length || searchArray.length === 3) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в видео:</span> {resultCount}
                </h5>
            );
        }

        if (searchArray.includes('description') && searchArray.includes('title')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в тексте и названиях видео:</span> {resultCount}
                </h5>
            );
        }
        if (searchArray.includes('description') && searchArray.includes('author')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в тексте и авторах видео:</span> {resultCount}
                </h5>
            );
        }

        if (searchArray.includes('title') && searchArray.includes('author')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в названиях и авторах видео:</span> {resultCount}
                </h5>
            );
        }

        if (searchArray.includes('description')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в тексте видео:</span> {resultCount}
                </h5>
            );
        }

        if (searchArray.includes('title')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в названиях видео:</span> {resultCount}
                </h5>
            );
        }

        if (searchArray.includes('author')) {
            return (
                <h5 className="mb-0">
                    <span>Найдено в авторах видео:</span> {resultCount}
                </h5>
            );
        }

        return null;
    };

    return renderText();
};

export default SearchResultTextVideo;
