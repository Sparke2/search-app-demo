import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCategoriesArray } from '../hooks/useCategoriesArray';
import { categories, CATEGORIES_LABELS } from '../data/consts';
import ArchiveItem from './card/ArchiveItem';
import BookItem from './card/BookItem';
import PeriodicalItem from './card/PeriodicalItem';
import AudioItem from './card/AudioItem';
import VideoItem from './card/VideoItem';
import SearchBooks from './card/SearchBooks';
import SearchPeriodicals from './card/SearchPeriodicals';
import SearchAudio from './card/SearchAudio';
import SearchVideo from './card/SearchVideo';
import SearchArchives from './card/SearchArchives';

const renderItem = (category) => {
  switch (category) {
    case 'searchBooks': return <BookItem />;
    case 'searchPeriodicals': return <PeriodicalItem />;
    case 'searchAudio': return <AudioItem />;
    case 'searchVideo': return <VideoItem />;
    case 'searchArchives': return <ArchiveItem />;
    default: return null;
  }
};

const ResultsAccordion = () => {
  const currentCategories = useCategoriesArray();
  const variant = currentCategories.length === 1 ? 'paginated' : currentCategories.length > 1 ? 'some-accordion' : 'all-accordion';

  const renderPaginated = () => {
    const category = currentCategories[0];
    switch (category) {
      case 'searchBooks': return <SearchBooks />;
      case 'searchPeriodicals': return <SearchPeriodicals />;
      case 'searchAudio': return <SearchAudio />;
      case 'searchVideo': return <SearchVideo />;
      case 'searchArchives': return <SearchArchives />;
      default: return null;
    }
  };

  const renderAccordionItems = (categoriesList) => {
    return categoriesList.map((cat, index) => (
      <Accordion.Item key={cat} eventKey={index}>
        <Accordion.Header>{`${CATEGORIES_LABELS[cat]}: ${0}`}</Accordion.Header>
        <Accordion.Body>
          {renderItem(cat)}
        </Accordion.Body>
      </Accordion.Item>
    ));
  };

  return (
    <div className="py-4">
      <h5 className="mb-4">Всего найдено:</h5>
      <Accordion>
        {variant === 'paginated' && renderPaginated()}
        {variant === 'some-accordion' && renderAccordionItems(currentCategories)}
        {variant === 'all-accordion' && renderAccordionItems(categories)}
      </Accordion>
    </div>
  );
};

export default ResultsAccordion;
