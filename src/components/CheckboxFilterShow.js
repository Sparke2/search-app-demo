import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

function CheckboxFilterShow() {
    const location = useLocation();
    const navigate = useNavigate();
    const [checkboxes, setCheckboxes] = useState({
        searchBooks: false,
        searchPeriodicals: false,
        searchAudio: false,
        searchVideo: false,
        searchArchives: false,
        author: false,
        title: false,
        description: false,
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newCheckboxes = { ...checkboxes };

        Object.keys(newCheckboxes).forEach(key => {
            newCheckboxes[key] = params.get(key) === 'true';
        });

        setCheckboxes(newCheckboxes);
    }, [location.search]);

    const updateURLParams = (updatedCheckboxes) => {
        const params = new URLSearchParams(location.search);
        Object.keys(updatedCheckboxes).forEach(key => {
            if (updatedCheckboxes[key]) {
                params.set(key, 'true');
            } else {
                params.delete(key);
            }
        });
        navigate({ search: params.toString() });
    };

    const removeFilter = (filterKey) => {
        const updatedCheckboxes = { ...checkboxes, [filterKey]: false };
        setCheckboxes(updatedCheckboxes);
        updateURLParams(updatedCheckboxes);
    };

    const clearAllFilters = () => {
        const params = new URLSearchParams(location.search);

        const filterKeysToClear = [
            'searchBooks',
            'searchPeriodicals',
            'searchAudio',
            'searchVideo',
            'searchArchives',
            'author',
            'title',
            'description',
        ];

        filterKeysToClear.forEach(key => {
            params.delete(key);
        });

        setCheckboxes({
            searchBooks: false,
            searchPeriodicals: false,
            searchAudio: false,
            searchVideo: false,
            searchArchives: false,
            author: false,
            title: false,
            description: false,
        });

        navigate({ search: params.toString() });
    };

    const activeFilters = Object.keys(checkboxes).filter(key => checkboxes[key]);

    if (activeFilters.length === 0) return null;

    return (
        <div className="d-flex flex-wrap gap-3 mt-3">
            {activeFilters.map(filterKey => (
                <button
                    key={filterKey}
                    className="badge-filter"
                    onClick={() => removeFilter(filterKey)}
                >
                    <span>{getLabelById(filterKey)}</span>
                    <span className="badge-filter-reset">x</span>
                </button>
            ))}
            <button className="badge-outline" onClick={clearAllFilters}>
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
        author: 'Область поиска: по автору',
        title: 'Область поиска: по названию',
        description: 'Область поиска: в тексте',
    };

    return labels[id];
}

export default CheckboxFilterShow;
