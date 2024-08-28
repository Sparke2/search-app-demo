import React, { useState, useMemo } from 'react';
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

  return (
    <div className="row g-4 pt-4">
      <div className="col-12">
        <h6 className='mb-3'>Поиск по</h6>
        <Checkbox id="searchBooks" label="Книгам"/>
        <Checkbox id="searchPeriodicals" label="Журналам"/>
        <Checkbox id="searchAudio" label="Аудио"/>
        <Checkbox id="searchVideo" label="Видео"/>
        <Checkbox id="searchArchives" label="Архивам"/>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Область поиска</h6>
        <Checkbox id="searchAuthor" label="По автору"/>
        <Checkbox id="searchTitle" label="По названию"/>
        <Checkbox id="searchInText" label="В тексте"/>
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
        <ReactSelect options={OptionsForAvailability} placeholder="Выберите из списка" defaultValue={defaultSelectedOptionsForAvailability}/>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Издательство</h6>
        <ReactSelect options={OptionsForPublishers} placeholder="Введите или выберите из списка"/>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Укрупненная группа специальностей</h6>
        <button className="btn btn-outline-primary w-100">Выберите УГСН</button>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Вид издания</h6>
        <ReactSelect options={OptionsForEditions} placeholder="Выберите из списка" isMulti/>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>Целевое назначение</h6>
        <ReactSelect options={OptionsForTarget} placeholder={"Выберите из списка"} isMulti/>
      </div>
      <div className="col-12">
        <h6 className='mb-3'>ББК</h6>
        <button className="btn btn-outline-primary w-100">Выберите ББК</button>
      </div>
      <div className='col-12'>
        <button className='btn btn-primary w-100'>Применить параметры</button>
      </div>
    </div>
  );
}

export default Filters;
