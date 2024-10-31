import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import ReactSelect from './ReactSelect';
import Checkbox from './Checkbox';
import ReactSelectWithLabel from './ReactSelectWithLabel';
import OptionsForEditions from '../filterdata/OptionsForEditions';
import OptionsForPublishers from '../filterdata/OptionsForPublishers';
import OptionsForAvailability from '../filterdata/OptionsForAvailability';
import OptionsForYears from '../filterdata/OptionsForYears';
import OptionsForTarget from '../filterdata/OptionsForTarget';
import OptionsForAdditionals from '../filterdata/OptionsForAdditionals';
import {BBKModalRoot} from './BBKModal';
import NodeBBK from '../filterdata/NodesBBK';
import {useBbk} from "../features/bbk/model/useBbk";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import InputISBN from "./InputISBN";
import {useCategoriesArray} from "../hooks/useCategoriesArray";

function Filters() {
    const currentCategories = useCategoriesArray();
    const location = useLocation();
    const {filterNodesBbkByKeys, bkkSelectedKeys, remove} = useBbk()
    const navigate = useNavigate();
    const [isModalBBKOpen, setModalBBKOpen] = useState(false);
    const selectedBBK = filterNodesBbkByKeys(bkkSelectedKeys).filter(Boolean)
    const renderSelectedBBK = () => {
        return selectedBBK.map((selectedItem, key) => {
            const nodeChildrenLength = NodeBBK[key]?.children?.length || 0;
            const selectedChildrenLength = selectedItem?.length || 0;
            if (nodeChildrenLength !== selectedChildrenLength) {
                return (
                    <div className="list-items-modal" key={key}>
                        {selectedItem.children.map((child, index) => (
                            <div key={index}>{child.label}
                                <button className="btn p-0 ps-2" onClick={() => remove(child.key)}>
                                    <FontAwesomeIcon icon={faXmark}/>
                                </button>
                            </div>

                        ))}
                    </div>
                );
            } else {
                return (
                    <div key={key}>
                        <span>{selectedItem.label}</span>
                    </div>
                );
            }
        });
    };

    const toggleBBKModal = () => {
        setModalBBKOpen(v => !v);
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

    const [isbn, setIsbn] = useState(searchParams.get('isbn') || '');
    const handleIsbnChange = (value) => {
        setIsbn(value);
    };

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
        setCheckboxes(prevState => ({...prevState, [id]: !prevState[id]}));
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

        if (isbn) {
            newSearchParams.set('isbn', isbn);
        } else {
            newSearchParams.delete('isbn');
        }

        navigate({search: newSearchParams.toString()});
    }, [checkboxes, selectedOptions.fromYear, selectedOptions.toYear, selectedOptions.availability, selectedOptions.publishers, selectedOptions.editions, selectedOptions.targets, selectedOptions.additionals, isbn, navigate]);

    // @ts-ignore
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
                {(['searchBooks', 'searchPeriodicals'].some(category => currentCategories.includes(category)) || currentCategories.length === 0)  && (
                    <h6 className='mb-3'>Год издания</h6>
                )}
                {( ['searchAudio', 'searchArchives'].some(category => currentCategories.includes(category)) &&
                    !['searchBooks', 'searchPeriodicals'].some(category => currentCategories.includes(category))) && (
                    <h6 className='mb-3'>Год записи</h6>
                )}
                {( ['searchBooks', 'searchPeriodicals', 'searchAudio', 'searchArchives'].includes(currentCategories[0]) || currentCategories.length === 0)  && (
                <div className='row g-4 pt-1'>
                    <div className='col-6'>
                        <ReactSelectWithLabel
                            options={OptionsForYears}
                            placeholder="От"
                            defaultValue={selectedOptions.fromYear}
                            onChange={option => setSelectedOptions(prev => ({...prev, fromYear: option}))}
                            applyFilters={applyFilters}
                        />
                    </div>
                    <div className='col-6'>
                        <ReactSelectWithLabel
                            options={filteredToYearOptions}
                            placeholder="До"
                            defaultValue={selectedOptions.toYear}
                            onChange={option => setSelectedOptions(prev => ({...prev, toYear: option}))}
                            applyFilters={applyFilters}
                        />
                    </div>
                </div>
                )}
            </div>
            {( ['searchBooks', 'searchPeriodicals', 'searchAudio'].some(category => currentCategories.includes(category)) || currentCategories.length === 0)  && (
            <div className="col-12">
                <h6 className='mb-3'>Доступность изданий</h6>
                <ReactSelect
                    options={OptionsForAvailability}
                    placeholder="Выберите из списка"
                    defaultValue={selectedOptions.availability}
                    onChange={option => setSelectedOptions(prev => ({...prev, availability: option}))}
                    applyFilters={applyFilters}
                />
            </div>
            )}
            {(['searchBooks', 'searchPeriodicals'].some(category => currentCategories.includes(category)) || currentCategories.length === 0)  && (
            <div className="col-12">
                <h6 className='mb-3'>Издательство</h6>
                <ReactSelect
                    options={OptionsForPublishers}
                    placeholder="Введите или выберите из списка"
                    isMulti
                    defaultValue={selectedOptions.publishers}
                    onChange={option => setSelectedOptions(prev => ({...prev, publishers: option}))}
                    applyFilters={applyFilters}
                />
            </div>
            )}
            {(['searchBooks', 'searchPeriodicals'].some(category => currentCategories.includes(category)) || currentCategories.length === 0)  && (
            <div className="col-12">
                <h6>ISBN</h6>
                <InputISBN
                    name="isbn"
                    placeholder="Введите номер"
                    value={isbn}
                    onChange={handleIsbnChange}
                    applyFilters={applyFilters}
                />
            </div>
            )}
            {(['searchBooks', 'searchPeriodicals'].some(category => currentCategories.includes(category)) || currentCategories.length === 0)  && (
            <div className="col-12">
                <h6 className='mb-3'>Укрупненная группа специальностей</h6>
                <button className="btn btn-outline-primary w-100">Выберите УГСН</button>
            </div>
            )}
            {(['searchBooks'].some(category => currentCategories.includes(category)) || currentCategories.length === 0)  && (
            <div className="col-12">
                <h6 className='mb-3'>Вид издания</h6>
                <ReactSelect
                    options={OptionsForEditions}
                    placeholder="Выберите из списка"
                    isMulti
                    defaultValue={selectedOptions.editions}
                    onChange={options => setSelectedOptions(prev => ({...prev, editions: options}))}
                    applyFilters={applyFilters}
                />
            </div>
            )}
            {(['searchBooks'].some(category => currentCategories.includes(category)) || currentCategories.length === 0)  && (
            <div className="col-12">
                <h6 className='mb-3'>Целевое назначение</h6>
                <ReactSelect
                    options={OptionsForTarget}
                    placeholder="Выберите из списка"
                    defaultValue={selectedOptions.targets}
                    onChange={options => setSelectedOptions(prev => ({...prev, targets: options}))}
                    applyFilters={applyFilters}
                    isMulti
                />
            </div>
            )}
            {(['searchBooks'].some(category => currentCategories.includes(category)) || currentCategories.length === 0)  && (
            <div className="col-12">
                <h6 className='mb-3'>Дополнительно</h6>
                <ReactSelect
                    options={OptionsForAdditionals}
                    placeholder="Выберите из списка"
                    defaultValue={selectedOptions.additionals}
                    onChange={options => setSelectedOptions(prev => ({...prev, additionals: options}))}
                    isMulti
                    applyFilters={applyFilters}
                />
            </div>
            )}
            {(['searchBooks'].some(category => currentCategories.includes(category)) || currentCategories.length === 0)  && (
            <div className="col-12">
                <h6 className="mb-3">ББК</h6>
                <div className="selected-items-modal">
                    {selectedBBK.length > 0 && (
                        <div className="list-items-modal">
                            {selectedBBK.map((item) => (
                                bkkSelectedKeys[item.key]?.partialChecked ? null :
                                    <div key={item.key}>
                                        {item.label}
                                        <button className="btn p-0 ps-2" onClick={() => remove(item.key)}>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>
                            ))}
                        </div>
                    )}
                    {renderSelectedBBK(NodeBBK, selectedBBK)}
                </div>
                <button className="btn btn-outline-primary w-100" onClick={toggleBBKModal}>
                    Выберите ББК
                </button>
                <BBKModalRoot isOpen={isModalBBKOpen} toggleModal={toggleBBKModal}/>
            </div>
            )}
            <div className='col-12'>
                <button className='btn btn-primary w-100' onClick={applyFilters}>Применить параметры</button>
            </div>
        </div>
    );
}

export default Filters;
