import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [labelText, setLabelText] = useState('Искать в найденном');
  

  const query = useMemo(() => new URLSearchParams(location.search).get('query'), [location.search]);

  useEffect(() => {
    if (query) {
      setSearchText(query);
      setLabelText(`Искать в найденном : <strong>${query}</strong>`);
    }
  }, [query]);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchText)}`);
      setLabelText(`Искать в найденном : <strong>${searchText}</strong>`);
    }
  };

  return (
    <div>
      <div className="position-relative">
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
          <button className="btn" type="submit" id="search" onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="fs-20" />
          </button>
        </div>
      </div>
      <div className="form-check mt-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="searchInFound"
        />
        <label
          className="form-check-label"
          htmlFor="searchInFound"
          dangerouslySetInnerHTML={{ __html: labelText }}
        />
      </div>
    </div>
  );
}

export default SearchForm;
