import React, {useEffect, useMemo, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from "react-router-dom";

function SearchForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [originalQuery, setOriginalQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [correctedText, setCorrectedText] = useState("");
  const [isCorrected, setIsCorrected] = useState(false);
  const [isCheckingSpelling, setIsCheckingSpelling] = useState(false);

  const query = useMemo(
      () => new URLSearchParams(location.search).get("query") || "",
      [location.search]
  );

  useEffect(() => {
    if (query !== originalQuery) {
      setOriginalQuery(query);
      setSearchText(query);
    }
  }, [query, originalQuery]);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const checkSpelling = async (text) => {
    try {
      const response = await fetch(
          `https://speller.yandex.net/services/spellservice.json/checkText?text=${encodeURIComponent(
              text
          )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        return data[0].s[0];
      }
      return text;
    } catch (error) {
      return text;
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchText.trim()) return;

    setIsCheckingSpelling(true);
    const corrected = await checkSpelling(searchText.trim());

    if (corrected !== searchText.trim()) {
      setCorrectedText(corrected);
      setIsCorrected(true);
    } else {
      setCorrectedText("");
      setIsCorrected(false);
    }

    setIsCheckingSpelling(false);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set(
        "query",
        corrected !== searchText.trim() ? corrected : searchText.trim()
    );
    navigate(`?${searchParams.toString()}`, { replace: true });
    setOriginalQuery(corrected !== searchText.trim() ? corrected : searchText.trim());
  };

  const clearSearch = () => {
    setSearchText("");
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("query");
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  const handleCorrectedSearch = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("query", searchText);
    navigate(`?${searchParams.toString()}`, { replace: true });
    setIsCorrected(false);
    setCorrectedText("");
  };

  return (
      <div>
        <div className="position-relative">
          <div className={`overlay ${isFocused ? "overlay-show" : ""}`}>
            <label className="overlay-label">Поиск по библиотеке</label>
          </div>
          <div className="input-group search">
            <input
                type="text"
                name="q"
                className="form-control search-main"
                placeholder={isFocused ? "" : "Введите запрос"}
                value={searchText}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch(event);
                    setIsFocused(false);
                  }
                }}
                disabled={isCheckingSpelling}
            />
            {searchText && (
                <button
                    type="button"
                    className="btn btn-clear"
                    onClick={clearSearch}
                    aria-label="Очистить"
                    disabled={isCheckingSpelling}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
            )}
            <button
                className="btn"
                type="submit"
                id="search"
                onClick={handleSearch}
                disabled={isCheckingSpelling}
            >
              {isCheckingSpelling ? (
                  <span className="spinner-border spinner-border-sm" role="status" />
              ) : (
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="fs-20" />
              )}
            </button>
          </div>
        </div>

        {isCorrected && correctedText && (
            <div className="mt-2 correct-text">
              <p className="mb-1">
                Показаны результаты по запросу <strong>{correctedText}</strong>{" "}
              </p>
              <button
                  type="button"
                  className="btn p-0"
                  onClick={handleCorrectedSearch}
              >
                Искать вместо этого: <strong>{searchText}</strong>
              </button>
            </div>
        )}

        {/*<div className="form-check mt-2">*/}
        {/*  <input*/}
        {/*      className="form-check-input"*/}
        {/*      type="checkbox"*/}
        {/*      id="searchInFound"*/}
        {/*  />*/}
        {/*  <label className="form-check-label" htmlFor="searchInFound">*/}
        {/*    Искать в найденном: <strong>{query}</strong>*/}
        {/*  </label>*/}
        {/*</div>*/}
      </div>
  );
}

export default SearchForm;
