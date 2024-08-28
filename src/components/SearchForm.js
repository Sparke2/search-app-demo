import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchForm() {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const labelContent = searchText 
    ? `Искать в найденном : <strong>${searchText}</strong>` 
    : 'Искать в найденном';

  return (
    <div>
      <div className='position-relative'>
        <div className={`overlay ${isFocused ? 'overlay-show' : ''}`}>
          <label className="overlay-label">
            Поиск по библиотеке
          </label>
        </div>
        <div className="input-group search">
          <input
            type="text"
            name="q"
            className="form-control search-main"
            placeholder={isFocused ? '' : 'Введите запрос'}
            value={searchText}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button className="btn" type="submit" id="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} className='fs-20' />
          </button>
        </div>
      </div>
      <div className="form-check mt-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="searchInFound"
        />
        <label className="form-check-label" htmlFor='searchInFound' dangerouslySetInnerHTML={{ __html: labelContent }} />
      </div>
    </div>
  );
}

export default SearchForm;
