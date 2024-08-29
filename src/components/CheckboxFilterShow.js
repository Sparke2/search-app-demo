import React from 'react';

function CheckboxFilterShow({ checkboxes, removeFilter, clearAllFilters }) {
    const activeFilters = Object.keys(checkboxes).filter(key => checkboxes[key]);

    if (activeFilters.length === 0) return null;

    return (
        <div className='d-flex flex-wrap gap-3 mt-3'>
            {activeFilters.map(filterKey => (
                <button
                    key={filterKey}
                    className='badge-filter'
                    onClick={() => removeFilter(filterKey)}
                >
                    <span>{getLabelById(filterKey)}</span>
                    <span className='badge-filter-reset'>x</span>
                </button>
            ))}
            <button
                className='badge-outline'
                onClick={clearAllFilters}
            >
                Очистить все x
            </button>
        </div>
    );
}

function getLabelById(id) {
    const labels = {
        searchBooks: 'Поиск по: книгам',
        searchPeriodicals: 'Поиск по: журналам',
        searchAudio: 'Поиск по: аудио',
        searchVideo: 'Поиск по: видео',
        searchArchives: 'Поиск по: архивам',
        searchAuthor: 'Область поиска: по автору',
        searchTitle: 'Область поиска: по названию',
        searchInText: 'Область поиска: в тексте',
    };

    return labels[id];
}

export default CheckboxFilterShow;
