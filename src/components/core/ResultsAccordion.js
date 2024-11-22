import React, {useCallback, useMemo} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useCategoriesArray} from '../../hooks/useCategoriesArray';
import {categories} from '../../data/consts';
import {SearchBooks} from '../../widgets/search-page/SearchBooks';
import {SearchPeriodicals} from '../../widgets/search-page/SearchPeriodicals';
import {SearchAudio} from '../../widgets/search-page/SearchAudio';
import {SearchVideo} from '../../widgets/search-page/SearchVideo';
import {SearchArchives} from '../../widgets/search-page/SearchArchives';
import {BookPreview} from "../../widgets/search-page-preview/BookPreview";
import {PeriodicalPreview} from "../../widgets/search-page-preview/PeriodicalPreview";
import {AudioPreview} from "../../widgets/search-page-preview/AudioPreview";
import {VideoPreview} from "../../widgets/search-page-preview/VideoPreview";
import {ArchivePreview} from "../../widgets/search-page-preview/ArchivePreview";

const ResultsAccordion = () => {
    const currentCategories = useCategoriesArray();
    const variant = currentCategories.length === 1 ? 'paginated' : currentCategories.length > 1 ? 'some-accordion' : 'all-accordion';

    const renderPaginated = useCallback(() => {
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
    }, [currentCategories]);
    const paginated = useMemo(() => renderPaginated(), [currentCategories])

    const renderAccordionItems = (categoriesList) => {
        return categoriesList.map((cat, index) => {
            switch (cat) {
                case 'searchBooks':
                    return <BookPreview key={index} index={index} cat={cat}/>;
                case 'searchPeriodicals':
                    return <PeriodicalPreview key={index} index={index} cat={cat}/>;
                case 'searchAudio':
                    return <AudioPreview key={index} index={index} cat={cat}/>;
                case 'searchVideo':
                    return <VideoPreview key={index} index={index} cat={cat}/>;
                case 'searchArchives':
                    return <ArchivePreview key={index} index={index} cat={cat}/>;
                default:
                    return null;
            }
        });
    };


    return (
        <div className="py-4">
            <Accordion>
                {(variant === 'some-accordion' || variant === 'all-accordion') &&
                    <h5 className="mb-4">Всего найдено:</h5>}
                {variant === 'paginated' && paginated}
                {variant === 'some-accordion' && renderAccordionItems(currentCategories)}
                {variant === 'all-accordion' && renderAccordionItems(categories)}
            </Accordion>
        </div>
    );
};

export default ResultsAccordion;
