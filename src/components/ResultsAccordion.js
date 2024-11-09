import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useCategoriesArray} from '../hooks/useCategoriesArray';
import {categories, CATEGORIES_LABELS} from '../data/consts';
import ArchiveItem from './core/card/ArchiveItem';
import PeriodicalItem from './core/card/PeriodicalItem';
import AudioItem from './core/card/AudioItem';
import VideoItem from './core/card/VideoItem';
import {SearchBooks} from '../widgets/search-page/SearchBooks';
import SearchPeriodicals from '../widgets/search-page/SearchPeriodicals';
import SearchAudio from '../widgets/search-page/SearchAudio';
import SearchVideo from '../widgets/search-page/SearchVideo';
import SearchArchives from '../widgets/search-page/SearchArchives';
import {BookPreview} from "../widgets/search-page-preview/BookPreview";

const renderItem = (category) => {
    switch (category) {
        case 'searchBooks':
            return <BookPreview/>;
        case 'searchPeriodicals':
            return <PeriodicalItem/>;
        case 'searchAudio':
            return <AudioItem/>;
        case 'searchVideo':
            return <VideoItem/>;
        case 'searchArchives':
            return <ArchiveItem/>;
        default:
            return null;
    }
};

const ResultsAccordion = () => {
    const currentCategories = useCategoriesArray();
    const variant = currentCategories.length === 1 ? 'paginated' : currentCategories.length > 1 ? 'some-accordion' : 'all-accordion';

    const renderPaginated = () => {
        const category = currentCategories[0];
        switch (category) {
            case 'searchBooks':
                return <SearchBooks/>;
            case 'searchPeriodicals':
                return <SearchPeriodicals/>;
            case 'searchAudio':
                return <SearchAudio/>;
            case 'searchVideo':
                return <SearchVideo/>;
            case 'searchArchives':
                return <SearchArchives/>;
            default:
                return null;
        }
    };

    const renderAccordionItems = (categoriesList) => {
        return categoriesList.map((cat, index) => (
            <Accordion.Item key={cat} eventKey={index}>
                <Accordion.Header> {`${CATEGORIES_LABELS[cat]}:`} <span className="ps-2">{0}</span></Accordion.Header>
                <Accordion.Body className="me-3">
                    {renderItem(cat)}
                </Accordion.Body>
            </Accordion.Item>
        ));
    };

    return (
        <div className="py-4">
            <Accordion>
                {(variant === 'some-accordion' || variant === 'all-accordion') &&
                    <h5 className="mb-4">Всего найдено:</h5>}
                {variant === 'paginated' && renderPaginated()}
                {variant === 'some-accordion' && renderAccordionItems(currentCategories)}
                {variant === 'all-accordion' && renderAccordionItems(categories)}
            </Accordion>
        </div>
    );
};

export default ResultsAccordion;
