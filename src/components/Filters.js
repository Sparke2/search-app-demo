import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactSelect from './ReactSelect';
import Checkbox from './Checkbox';
import ReactSelectWithLabel from './ReactSelectWithLabel';
import OptionsForEditions from '../filterdata/OptionsForEditions';
import OptionsForPublishers from '../filterdata/OptionsForPublishers';
import OptionsForAvailability from '../filterdata/OptionsForAvailability';
import OptionsForYears from '../filterdata/OptionsForYears';
import OptionsForTarget from '../filterdata/OptionsForTarget';
import OptionsForAdditionals from '../filterdata/OptionsForAdditionals';
import BBKModal from './BBKModal';
import NodeBBK from '../filterdata/NodesBBK';
import { useBBK } from '../providers/BBKContext';

function Filters() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalBBKOpen, setModalBBKOpen] = useState(false);
  const { selectedBBK, removeBBK } = useBBK();
  //todo если NodeBBK[key].children.length не совпадает с selectedBBK[key].length, значит при рендере
  // фильроов - нерендерить selectdBKK[key].label, если совпадает, то не ренджерить selectedBKK[key].children
  const renderSelectedBBK = (NodeBBK, selectedBBK) => {
    return selectedBBK.map((selectedItem, key) => {
      const nodeChildrenLength = NodeBBK[key]?.children?.length || 0;
      const selectedChildrenLength = selectedItem?.length || 0;

      if (nodeChildrenLength !== selectedChildrenLength) {
        // Render logic when lengths do not match
        return (
            <div key={key}>
              {/* Render selectedBBK[key].children */}
              {selectedItem.children.map((child, index) => (
                  <div key={index}>{child.label}</div>
              ))}
            </div>
        );
      } else {
        // Render logic when lengths match
        return (
            <div key={key}>
              {/* Render selectedBBK[key].label */}
              <span>{selectedItem.label}</span>
            </div>
        );
      }
    });
  };
  console.log({xyi:selectedBBK});
  
  const toggleBBKModal = () => {
    setModalBBKOpen(!isModalBBKOpen);
  };
  const searchParams = new URLSearchParams(location.search);

  const getOption = (key, options) => {
    const value = searchParams.get(key);
    return value ? options.find(option => option.value === value) : null;
  };

  const getYear = (key, options) => {
    const value = Number(searchParams.get(key));
    return value ? options.find(option => option.value === value) : null;
  };

  const getMultyArrayOptions = (key, options) => {
    const value = searchParams.get(key);
    if (!value) return [];
    return value.split(',').map(trimmedValue => {
      return options.reduce((acc, group) => {
        const option = group.options.find(option => option.value === trimmedValue.trim());
        return option || acc;
      }, undefined);
    }).filter(Boolean);
  };
  
  const getMultyOptions = (key, options) => {
    const value = searchParams.get(key);
    if (!value) return [];
    return value.split(',').map(trimmedValue => {
      return options.find(option => option.value === trimmedValue.trim());
    }).filter(Boolean);
  }

  const defaultSelectedOptions = {
    availability: getOption('availability', OptionsForAvailability) || OptionsForAvailability.find(option => option.selected),
    publishers: getMultyOptions('publishers', OptionsForPublishers),
    editions: getMultyArrayOptions('editions', OptionsForEditions),
    targets: getMultyArrayOptions('targets', OptionsForTarget),
    additionals: getMultyOptions('additionals', OptionsForAdditionals),
    fromYear: getYear('fromYear', OptionsForYears),
    toYear: getYear('toYear', OptionsForYears),
  };

  const [selectedOptions, setSelectedOptions] = useState({
    availability: defaultSelectedOptions.availability,
    publishers: defaultSelectedOptions.publishers,
    editions: defaultSelectedOptions.editions,
    additionals: defaultSelectedOptions.additionals,
    targets: defaultSelectedOptions.targets,
    fromYear: defaultSelectedOptions.fromYear,
    toYear: defaultSelectedOptions.toYear,
  });

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

  useEffect(() => {
    const updatedCheckboxes = Object.fromEntries(
      Object.keys(checkboxes).map(key => [key, searchParams.get(key) === 'true'])
    );
    setCheckboxes(updatedCheckboxes);
  }, [location.search]);

  const filteredToYearOptions = useMemo(() => {
    return selectedOptions.fromYear 
      ? OptionsForYears.filter(option => option.value >= selectedOptions.fromYear.value) 
      : OptionsForYears;
  }, [selectedOptions.fromYear]);

  const handleCheckboxChange = useCallback((id) => {
    setCheckboxes(prevState => ({ ...prevState, [id]: !prevState[id] }));
  }, []);

  const applyFilters = useCallback(() => {
    const newSearchParams = new URLSearchParams();
    
    Object.entries(checkboxes).forEach(([key, value]) => {
      if (value) newSearchParams.set(key, 'true');
    });

    if (selectedOptions.fromYear) {
      newSearchParams.set('fromYear', selectedOptions.fromYear.value);
    }
    if (selectedOptions.toYear) {
      newSearchParams.set('toYear', selectedOptions.toYear.value);
    }
    if (selectedOptions.availability) {
      newSearchParams.set('availability', selectedOptions.availability.value);
    }
    if (selectedOptions.publishers.length > 0) {
      const publishersValues = selectedOptions.publishers.map(option => option.value).join(',');
      newSearchParams.set('publishers', publishersValues);
    }
    if (selectedOptions.editions.length > 0) {
      const editionsValues = selectedOptions.editions.map(option => option.value).join(',');
      newSearchParams.set('editions', editionsValues);
    }

    if (selectedOptions.targets.length > 0) {
      const targetsValues = selectedOptions.targets.map(option => option.value).join(',');
      newSearchParams.set('targets', targetsValues);
    }

    if (selectedOptions.additionals.length > 0) {
      const additionalsValues = selectedOptions.additionals.map(option => option.value).join(',');
      newSearchParams.set('additionals', additionalsValues);
    }

    navigate({ search: newSearchParams.toString() });
  }, [checkboxes, selectedOptions, navigate]);

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
              defaultValue={selectedOptions.fromYear}
              onChange={option => setSelectedOptions(prev => ({ ...prev, fromYear: option }))}
            />
          </div>
          <div className='col-6'>
            <ReactSelectWithLabel
              options={filteredToYearOptions}
              placeholder="До"
              defaultValue={selectedOptions.toYear}
              onChange={option => setSelectedOptions(prev => ({ ...prev, toYear: option }))}
            />
          </div>
        </div>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Доступность изданий</h6>
        <ReactSelect 
          options={OptionsForAvailability} 
          placeholder="Выберите из списка" 
          defaultValue={selectedOptions.availability} 
          onChange={option => setSelectedOptions(prev => ({ ...prev, availability: option }))}
        />
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Издательство</h6>
        <ReactSelect 
          options={OptionsForPublishers} 
          placeholder="Введите или выберите из списка"
          isMulti
          defaultValue={selectedOptions.publishers}  
          onChange={option => setSelectedOptions(prev => ({ ...prev, publishers: option }))}
        />
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Укрупненная группа специальностей</h6>
        <button className="btn btn-outline-primary w-100">Выберите УГСН</button>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Вид издания</h6>
        <ReactSelect 
          options={OptionsForEditions} 
          placeholder="Выберите из списка" 
          isMulti 
          defaultValue={selectedOptions.editions}
          onChange={options => setSelectedOptions(prev => ({ ...prev, editions: options }))}
        />
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Целевое назначение</h6>
        <ReactSelect 
          options={OptionsForTarget} 
          placeholder="Выберите из списка" 
          defaultValue={selectedOptions.targets}
          onChange={options => setSelectedOptions(prev => ({ ...prev, targets: options }))}
          isMulti 
        />
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Дополнительно</h6>
        <ReactSelect 
          options={OptionsForAdditionals} 
          placeholder="Выберите из списка" 
          defaultValue={selectedOptions.additionals}
          onChange={options => setSelectedOptions(prev => ({ ...prev, additionals: options }))}
          isMulti 
        />
      </div>
      <div className="col-12">
      <h6 className="mb-3">ББК</h6>
        {renderSelectedBBK(NodeBBK, selectedBBK)}
        {selectedBBK.length > 0 && (
          <div>
            <ul>
              {selectedBBK.map((item) => (
                <li key={item.key}>
                  {item.label}
                  <button
                    className="btn btn-sm btn-danger ml-2"
                    onClick={() => removeBBK(item.key)}
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button className="btn btn-outline-primary w-100" onClick={toggleBBKModal}>
          Выберите ББК
        </button>
        <BBKModal isOpen={isModalBBKOpen} toggleModal={toggleBBKModal} />
      </div>
      <div className='col-12'>
        <button className='btn btn-primary w-100' onClick={applyFilters}>Применить параметры</button>
      </div>
    </div>
  );
}

export default Filters;
