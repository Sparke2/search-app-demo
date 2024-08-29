import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactSelect from './ReactSelect';
import Checkbox from './Checkbox';
import OptionsForEditions from '../filterdata/OptionsForEditions';
import OptionsForPublishers from '../filterdata/OptionsForPublishers';
import OptionsForAvailability from '../filterdata/OptionsForAvailability';
import OptionsForYears from '../filterdata/OptionsForYears';
import OptionsForTarget from '../filterdata/OptionsForTarget';
import ReactSelectWithLabel from './ReactSelectWithLabel';

function Filters() {
  const defaultSelectedOptionsForAvailability = OptionsForAvailability.filter(option => option.selected);
  const [selectedFromYear, setSelectedFromYear] = useState(null);
  const [selectedToYear, setSelectedToYear] = useState(null);

  const filteredToYearOptions = useMemo(() => {
    if (!selectedFromYear) return OptionsForYears;
    return OptionsForYears.filter(option => option.value >= selectedFromYear.value);
  }, [selectedFromYear]);

  const location = useLocation();
  const navigate = useNavigate();

  const [checkboxes, setCheckboxes] = useState({
    searchBooks: false,
    searchPeriodicals: false,
    searchAudio: false,
    searchVideo: false,
    searchArchives: false,
    searchAuthor: false,
    searchTitle: false,
    searchInText: false,
  });

  const handleCheckboxChange = (id) => {
    setCheckboxes(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const updatedCheckboxes = { ...checkboxes };

    for (const key in updatedCheckboxes) {
      updatedCheckboxes[key] = searchParams.get(key) === 'true';
    }

    setCheckboxes(updatedCheckboxes);
  }, [location.search]);

  const applyFilters = () => {
    const searchParams = new URLSearchParams();

    for (const key in checkboxes) {
      if (checkboxes[key]) {
        searchParams.set(key, 'true');
      }
    }

    navigate({ search: searchParams.toString() });
  };

  return (
    <div className="row g-4 pt-4">
      <div className="col-12">
        <h6 className='mb-3'>Поиск по</h6>
        <Checkbox
          id="searchBooks"
          label="Книгам"
          isChecked={checkboxes.searchBooks}
          handleCheckboxChange={handleCheckboxChange}
          applyFilters={applyFilters}
        />
        <Checkbox
          id="searchPeriodicals"
          label="Журналам"
          isChecked={checkboxes.searchPeriodicals}
          handleCheckboxChange={handleCheckboxChange}
          applyFilters={applyFilters}
        />
        <Checkbox
          id="searchAudio"
          label="Аудио"
          isChecked={checkboxes.searchAudio}
          handleCheckboxChange={handleCheckboxChange}
          applyFilters={applyFilters}
        />
        <Checkbox
          id="searchVideo"
          label="Видео"
          isChecked={checkboxes.searchVideo}
          handleCheckboxChange={handleCheckboxChange}
          applyFilters={applyFilters}
        />
        <Checkbox
          id="searchArchives"
          label="Архивам"
          isChecked={checkboxes.searchArchives}
          handleCheckboxChange={handleCheckboxChange}
          applyFilters={applyFilters}
        />
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Область поиска</h6>
        <Checkbox 
          id="searchAuthor" 
          label="По автору"
          isChecked={checkboxes.searchAuthor}
          handleCheckboxChange={handleCheckboxChange}
          applyFilters={applyFilters}
        />
        <Checkbox 
          id="searchTitle" 
          label="По названию"
          isChecked={checkboxes.searchTitle}
          handleCheckboxChange={handleCheckboxChange}
          applyFilters={applyFilters} 
        />
        <Checkbox 
          id="searchInText" 
          label="В тексте"
          isChecked={checkboxes.searchInText}
          handleCheckboxChange={handleCheckboxChange}
          applyFilters={applyFilters} 
        />
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Год издания</h6>
        <div className='row g-4 pt-1'>
          <div className='col-6'>
            <ReactSelectWithLabel
              options={OptionsForYears}
              placeholder="От"
              value={selectedFromYear}
              onChange={setSelectedFromYear}
            />
          </div>
          <div className='col-6'>
            <ReactSelectWithLabel
              options={filteredToYearOptions}
              placeholder="До"
              value={selectedToYear}
              onChange={setSelectedToYear}
            />
          </div>
        </div>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Доступность изданий</h6>
        <ReactSelect options={OptionsForAvailability} placeholder="Выберите из списка" defaultValue={defaultSelectedOptionsForAvailability} />
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Издательство</h6>
        <ReactSelect options={OptionsForPublishers} placeholder="Введите или выберите из списка" />
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Укрупненная группа специальностей</h6>
        <button className="btn btn-outline-primary w-100">Выберите УГСН</button>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Вид издания</h6>
        <ReactSelect options={OptionsForEditions} placeholder="Выберите из списка" isMulti />
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Целевое назначение</h6>
        <ReactSelect options={OptionsForTarget} placeholder={"Выберите из списка"} isMulti />
      </div>
      <div className="col-12">
        <h6 className='mb-3'>ББК</h6>
        <button className="btn btn-outline-primary w-100">Выберите ББК</button>
      </div>
      <div className='col-12'>
        <button className='btn btn-primary w-100' onClick={applyFilters}>Применить параметры</button>
      </div>
    </div>
  );
}

export default Filters;
