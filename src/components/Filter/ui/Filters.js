import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import ReactSelect from '../../ReactSelect';
import Checkbox from '../../Checkbox';
import ReactSelectWithLabel from '../../ReactSelectWithLabel';
import OptionsForEditions from '../../../filterdata/OptionsForEditions';
import OptionsForPublishers from '../../../filterdata/OptionsForPublishers';
import OptionsForAvailability from '../../../filterdata/OptionsForAvailability';
import OptionsForYears from '../../../filterdata/OptionsForYears';
import OptionsForTarget from '../../../filterdata/OptionsForTarget';
import OptionsForAdditionals from '../../../filterdata/OptionsForAdditionals';
import OptionsForVAK from '../../../filterdata/OptionsForVAK';
import OptionsForSubscribe from "../../../filterdata/OptionsForSubscribe";
import OptionsForAppointment from "../../../filterdata/OptionsForAppointment";
import OptionsForPerformers from "../../../filterdata/OptionsForPerformers";
import OptionsCheckboxForGenre from "../../../filterdata/OptionsCheckboxForGenre";
import OptionsCheckboxForCollections from "../../../filterdata/OptionsCheckboxForCollections";
import {BBKModalRoot} from '../../../data/bbk/ui/BBKModal';
import InputISBN from "../../InputISBN";
import {useCategoriesArray} from "../../../hooks/useCategoriesArray";
import {NodesBBKList} from "../../../data/bbk/ui/NodesBBKList";
import {GroupModalsChain} from "./GroupModals/GroupModals";
import {CurrentCategoriesExclusive} from "../../CurrentCategoriesExclusive";

function Filters() {
    const currentCategories = useCategoriesArray();
    const location = useLocation();
    const navigate = useNavigate();
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
        appointments: getMultyOptions('appointments', OptionsForAppointment),
        performers: getMultyOptions('performers', OptionsForPerformers),
        vak: getOption('vak', OptionsForVAK) || OptionsForVAK.find(option => option.selected),
        subscribe: getOption('subscribe', OptionsForSubscribe) || OptionsForSubscribe.find(option => option.selected),
        availability: getOption('availability', OptionsForAvailability) || OptionsForAvailability.find(option => option.selected),
        publishers: getMultyOptions('publishers', OptionsForPublishers),
        editions: getMultyArrayOptions('editions', OptionsForEditions),
        targets: getMultyArrayOptions('targets', OptionsForTarget),
        additionals: getMultyOptions('additionals', OptionsForAdditionals),
        fromYear: getYear('fromYear', OptionsForYears),
        toYear: getYear('toYear', OptionsForYears),
    };

    const [selectedOptions, setSelectedOptions] = useState({
        vak: defaultSelectedOptions.vak,
        performers: defaultSelectedOptions.performers,
        appointments: defaultSelectedOptions.appointments,
        subscribe: defaultSelectedOptions.subscribe,
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
        ...Object.fromEntries(OptionsCheckboxForGenre.map(option => [`genre-${option.value}`, false])),
        ...Object.fromEntries(OptionsCheckboxForCollections.map(option => [`collection-${option.value}`, false])),
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
        const newSearchParams = new URLSearchParams(location.search);
        Object.entries(checkboxes).forEach(([key, value]) => {
            if (value) {
                newSearchParams.set(key, 'true');
            } else {
                newSearchParams.delete(key);
            }
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
        if (selectedOptions.vak) {
            newSearchParams.set('vak', selectedOptions.vak.value);
        }
        if (selectedOptions.subscribe) {
            newSearchParams.set('subscribe', selectedOptions.subscribe.value);
        }
        if (selectedOptions.appointments.length > 0) {
            const appointmentsValues = selectedOptions.appointments.map(option => option.value).join(',');
            newSearchParams.set('appointments', appointmentsValues);
        }
        if (selectedOptions.performers.length > 0) {
            const performersValues = selectedOptions.performers.map(option => option.value).join(',');
            newSearchParams.set('performers', performersValues);
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
    }, [location.search, checkboxes, selectedOptions, isbn, navigate]);

    const renderGenreCheckboxes = () => {
        return OptionsCheckboxForGenre.map(option => (
            <Checkbox
                key={`genre-${option.value}`}
                id={`genre-${option.value}`}
                label={option.label}
                isChecked={checkboxes[`genre-${option.value}`]}
                handleCheckboxChange={handleCheckboxChange}
                applyFilters={applyFilters}
            />
        ));
    };

    const renderCollectionCheckboxes = () => {
        return OptionsCheckboxForCollections.map(option => (
            <Checkbox
                key={`collection-${option.value}`}
                id={`collection-${option.value}`}
                label={option.label}
                isChecked={checkboxes[`collection-${option.value}`]}
                handleCheckboxChange={handleCheckboxChange}
                applyFilters={applyFilters}
            />
        ));
    };

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
                {[{value: 'searchAuthor', label: 'По автору'}, {
                    value: 'searchTitle',
                    label: 'По названию'
                }, {value: 'searchInText', label: 'По тексту'}].map(({value, label}) => (
                    <Checkbox
                        id={value}
                        label={label}
                        isChecked={checkboxes?.[value]}
                        handleCheckboxChange={handleCheckboxChange}
                        applyFilters={applyFilters}
                    />
                ))
                }

            </div>
            <div className="col-12">
                {(['searchBooks', 'searchPeriodicals'].some(category => currentCategories.includes(category)) || currentCategories.length === 0) && (
                    <h6 className='mb-3'>Год издания</h6>
                )}
                {(['searchAudio', 'searchArchives'].some(category => currentCategories.includes(category)) &&
                    !['searchBooks', 'searchPeriodicals'].some(category => currentCategories.includes(category))) && (
                    <h6 className='mb-3'>Год записи</h6>
                )}
                {(['searchBooks', 'searchPeriodicals', 'searchAudio', 'searchArchives'].includes(currentCategories[0]) || currentCategories.length === 0) && (
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
            {(['searchAudio'].some(category => currentCategories.includes(category))) && (
                <div className="col-12">
                    <h6 className='mb-3'>Жанры</h6>
                    {renderGenreCheckboxes()}
                </div>
            )}
            {(['searchAudio'].some(category => currentCategories.includes(category))) && (
                <div className="col-12">
                    <h6 className='mb-3'>Коллекции</h6>
                    {renderCollectionCheckboxes()}
                </div>
            )}
            {(['searchBooks', 'searchPeriodicals', 'searchAudio'].some(category => currentCategories.includes(category)) || currentCategories.length === 0) && (
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
            {(['searchAudio'].some(category => currentCategories.includes(category))) && (
                <div className="col-12">
                    <h6 className='mb-3'>Исполнители</h6>
                    <ReactSelect
                        options={OptionsForPerformers}
                        placeholder="Введите фамилию автора"
                        isMulti
                        defaultValue={selectedOptions.performers}
                        onChange={option => setSelectedOptions(prev => ({...prev, performers: option}))}
                        applyFilters={applyFilters}
                    />
                </div>
            )}
            {(['searchBooks', 'searchPeriodicals'].some(category => currentCategories.includes(category)) || currentCategories.length === 0) && (
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
            {(['searchAudio'].some(category => currentCategories.includes(category))) && (
                <div className="col-12">
                    <h6 className='mb-3'>Назначение</h6>
                    <ReactSelect
                        options={OptionsForAppointment}
                        placeholder="Выберите из списка"
                        isMulti
                        defaultValue={selectedOptions.appointments}
                        onChange={option => setSelectedOptions(prev => ({...prev, appointments: option}))}
                        applyFilters={applyFilters}
                    />
                </div>
            )}
            {(['searchBooks', 'searchPeriodicals'].some(category => currentCategories.includes(category)) || currentCategories.length === 0) && (
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
            {(['searchPeriodicals'].some(category => currentCategories.includes(category))) && (
                <div className="col-12">
                    <h6 className='mb-3'>Входит ли в ВАК</h6>
                    <ReactSelect
                        options={OptionsForVAK}
                        placeholder="Выберите из списка"
                        defaultValue={selectedOptions.vak}
                        onChange={option => setSelectedOptions(prev => ({...prev, vak: option}))}
                        applyFilters={applyFilters}
                    />
                </div>
            )}
            {(['searchPeriodicals'].some(category => currentCategories.includes(category))) && (
                <div className="col-12">
                    <h6 className='mb-3'>Вариант подписки</h6>
                    <ReactSelect
                        options={OptionsForSubscribe}
                        placeholder="Вариант подписки"
                        defaultValue={selectedOptions.subscribe}
                        onChange={option => setSelectedOptions(prev => ({...prev, subscribe: option}))}
                        applyFilters={applyFilters}
                    />
                </div>
            )}
            <GroupModalsChain/>
            {(['searchBooks'].some(category => currentCategories.includes(category)) || currentCategories.length === 0) && (
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
            <CurrentCategoriesExclusive categories={['searchBooks']}>
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
            </CurrentCategoriesExclusive>
            {(['searchBooks'].some(category => currentCategories.includes(category)) || currentCategories.length === 0) && (
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
            {(['searchBooks'].some(category => currentCategories.includes(category)) || currentCategories.length === 0) && (
                <div className="col-12">
                    <NodesBBKList/>
                    <BBKModalRoot/>
                </div>
            )}
            <div className='col-12'>
                <button className='btn btn-primary w-100' onClick={applyFilters}>Применить параметры</button>
            </div>
        </div>
    );
}

export default Filters;
