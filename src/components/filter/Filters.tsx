import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import ReactSelect from '../core/filter/ReactSelect';
import Checkbox from '../core/filter/Checkbox';
import ReactSelectWithLabel from '../core/filter/ReactSelectWithLabel';
import OptionsForEditions from '../../mock/OptionsForEditions';
import OptionsForAvailability from '../../mock/OptionsForAvailability';
import OptionsForYears from '../../mock/OptionsForYears';
import OptionsForTarget from '../../mock/OptionsForTarget';
import OptionsForAdditionals from '../../mock/OptionsForAdditionals';
import OptionsForVAK from '../../mock/OptionsForVAK';
import OptionsForSubscribe from "../../mock/OptionsForSubscribe";
import OptionsForAppointment from "../../mock/OptionsForAppointment";
import {BBKModalRoot} from '../../data/bbk/ui/BBKModal';
import InputISBN from "../core/filter/InputISBN";
import {useCategoriesArray} from "../../hooks/useCategoriesArray";
import {NodesBBKList} from "../../data/bbk/ui/NodesBBKList";
import {GroupModalsChain} from "./ui/GroupModals/GroupModals";
import {CurrentCategoriesExclusive} from "../core/filter/CurrentCategoriesExclusive";
import {CheckboxSearchParam} from "./model/contst/CheckboxSearchParam";
import {CheckboxSearchArea} from "./model/contst/CheckboxSearchArea";
import {ChannelList} from "../../data/channel/ui/ChannelList";
import {ChannelModalRoot} from "../../data/channel/ui/ChannelModal";
import {LibraryList} from "../../data/library/ui/LibraryList";
import {LibraryModalRoot} from "../../data/library/ui/LibraryModal";
import {useFilter} from "../../data/filter/model/queries";
import {Filter} from "../../data/filter/model/types";
import {useCheckboxQueryParams} from "../../hooks/useCheckboxQueryParams";
import {useCombinedPubhouses} from "../../hooks/useCombinedPubhouses";

const Filters = forwardRef((_, ref) => {
    const currentCategories = useCategoriesArray();
    const location = useLocation();
    const navigate = useNavigate();
    const {data: performers = [], isLoading: performLoad} = useFilter("audios", "executants") as {
        data: Filter[],
        isLoading: boolean
    };
    const optionsForPerformers = performers.map(({val}) => ({value: val, label: val}))
    const { data: pubhouses, isLoading: pubhousesLoad } = useCombinedPubhouses();
    const optionsForPubhouses = pubhouses.map(({val}) => ({value: val, label: val}))
    const {data: genres = [], isLoading: genLoad} = useFilter("audios", "genres") as {
        data: Filter[],
        isLoading: boolean
    };
    const optionsCheckboxForGenre = genres.map(({val}) => ({value: val, label: val}))
    const genresValue = useCheckboxQueryParams('genre');
    const {data: collections = [], isLoading: colLoad} = useFilter("audios", "collections") as {
        data: Filter[],
        isLoading: boolean
    };
    const optionsCheckboxForCollection = collections.map(({val}) => ({value: val, label: val}))
    const collectionsValue = useCheckboxQueryParams('collections');

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
        performers: getMultyOptions('performers', optionsForPerformers),
        pubhouses: getMultyOptions('pubhouses', optionsForPubhouses),
        vak: getOption('vak', OptionsForVAK) || OptionsForVAK.find(option => option.selected),
        subscribe: getOption('subscribe', OptionsForSubscribe) || OptionsForSubscribe.find(option => option.selected),
        availability: getOption('availability', OptionsForAvailability) || OptionsForAvailability.find(option => option.selected),
        editions: getMultyArrayOptions('editions', OptionsForEditions),
        targets: getMultyArrayOptions('targets', OptionsForTarget),
        additionals: getMultyOptions('additionals', OptionsForAdditionals),
        fromYear: getYear('fromYear', OptionsForYears),
        toYear: getYear('toYear', OptionsForYears),
    };

    const [selectedOptions, setSelectedOptions] = useState({
        vak: defaultSelectedOptions.vak,
        performers: defaultSelectedOptions.performers,
        pubhouses: defaultSelectedOptions.pubhouses,
        appointments: defaultSelectedOptions.appointments,
        subscribe: defaultSelectedOptions.subscribe,
        availability: defaultSelectedOptions.availability,
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
        author: false,
        title: false,
        description: false,
        ...Object.fromEntries(genresValue.map(option => [`genre-${option}`, true])),
        ...Object.fromEntries(collectionsValue.map(option => [`collection-${option}`, true])),
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
        } else {
            newSearchParams.delete('fromYear');
        }
        if (selectedOptions.toYear) {
            newSearchParams.set('toYear', selectedOptions.toYear.value);
        } else {
            newSearchParams.delete('toYear');
        }
        if (selectedOptions.availability) {
            newSearchParams.set('availability', selectedOptions.availability.value);
        } else {
            newSearchParams.delete('availability');
        }
        if (selectedOptions.vak && selectedOptions.vak.value !== "") {
            newSearchParams.set('vak', selectedOptions.vak.value);
        } else {
            newSearchParams.delete('vak');
        }
        if (selectedOptions.subscribe && selectedOptions.subscribe.value !== "") {
            newSearchParams.set('subscribe', selectedOptions.subscribe.value);
        } else {
            newSearchParams.delete('subscribe');
        }
        if (selectedOptions.appointments.length > 0) {
            const appointmentsValues = selectedOptions.appointments.map(option => option.value).join(',');
            newSearchParams.set('appointments', appointmentsValues);
        } else {
            newSearchParams.delete('appointments');
        }
        if (selectedOptions.performers.length > 0) {
            const performersValues = selectedOptions.performers.map(option => option.value).join(',');
            newSearchParams.set('performers', performersValues);
        } else {
            newSearchParams.delete('performers');
        }
        if (selectedOptions.pubhouses.length > 0) {
            const publishersValues = selectedOptions.pubhouses.map(option => option.value).join(',');
            newSearchParams.set('pubhouses', publishersValues);
        } else {
            newSearchParams.delete('pubhouses');
        }
        if (selectedOptions.editions.length > 0) {
            const editionsValues = selectedOptions.editions.map(option => option.value).join(',');
            newSearchParams.set('editions', editionsValues);
        } else {
            newSearchParams.delete('editions');
        }

        if (selectedOptions.targets.length > 0) {
            const targetsValues = selectedOptions.targets.map(option => option.value).join(',');
            newSearchParams.set('targets', targetsValues);
        } else {
            newSearchParams.delete('targets');
        }

        if (selectedOptions.additionals.length > 0) {
            const additionalsValues = selectedOptions.additionals.map(option => option.value).join(',');
            newSearchParams.set('additionals', additionalsValues);
        } else {
            newSearchParams.delete('additionals');
        }

        if (isbn) {
            newSearchParams.set('isbn', isbn);
        } else {
            newSearchParams.delete('isbn');
        }
        navigate({search: newSearchParams.toString()});
    }, [location.search, checkboxes, selectedOptions, isbn, navigate]);

    const renderGenreCheckboxes = () => {
        return optionsCheckboxForGenre.map(option => (
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
        return optionsCheckboxForCollection.map(option => (
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

    useImperativeHandle(ref, () => ({
        applyFilters,
    }));

    // @ts-ignore
    return (
        <div className="row g-4 pt-sm-4">
            <CheckboxSearchParam handleCheckboxChange={handleCheckboxChange} checkboxes={checkboxes}
                                 applyFilters={applyFilters}/>
            <CheckboxSearchArea handleCheckboxChange={handleCheckboxChange} checkboxes={checkboxes}
                                applyFilters={applyFilters}/>
            {(['searchArchives'].some(category => currentCategories.includes(category))) && (
                <div className="col-12">
                    <LibraryList/>
                    <LibraryModalRoot/>
                </div>
            )}
            {(['searchBooks', 'searchPeriodicals', 'searchAudio', 'searchArchives'].some(category => currentCategories.includes(category)) || currentCategories.length === 0) && (
                <div className="col-12 year">
                    {(['searchBooks', 'searchPeriodicals'].some(category => currentCategories.includes(category)) || currentCategories.length === 0) && (
                        <h6 className='mb-3'>Год издания</h6>
                    )}
                    {(['searchAudio', 'searchArchives'].some(category => currentCategories.includes(category)) &&
                        !['searchBooks', 'searchPeriodicals'].some(category => currentCategories.includes(category))) && (
                        <h6 className='mb-3'>Год записи</h6>
                    )}

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
                </div>
            )}
            {(['searchAudio'].some(category => currentCategories.includes(category))) && (
                <div className="col-12">
                    <h6 className='mb-3'>Жанры</h6>
                    {(!genLoad) && (
                        renderGenreCheckboxes()
                    )}
                </div>
            )}
            {(['searchAudio'].some(category => currentCategories.includes(category))) && (
                <div className="col-12">
                    <h6 className='mb-3'>Коллекции</h6>
                    {(!colLoad) && (
                        renderCollectionCheckboxes()
                    )}
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
            {
                (['searchAudio'].some(category => currentCategories.includes(category))) && (
                    <div className="col-12">
                        <h6 className='mb-3'>Исполнители</h6>
                        {(!performLoad) && (
                            <ReactSelect
                                options={optionsForPerformers}
                                placeholder="Введите фамилию автора"
                                isMulti
                                defaultValue={defaultSelectedOptions.performers}
                                onChange={option => setSelectedOptions(prev => ({...prev, performers: option}))}
                                applyFilters={applyFilters}
                            />
                        )}
                    </div>
                )
            }

            {(['searchBooks', 'searchPeriodicals', 'searchAudio'].some(category => currentCategories.includes(category)) || currentCategories.length === 0) && (
                <div className="col-12">
                    <h6 className='mb-3'>Издательство</h6>
                    {(!pubhousesLoad)&&(
                        <ReactSelect
                            options={optionsForPubhouses}
                            placeholder="Введите или выберите из списка"
                            isMulti
                            defaultValue={selectedOptions.pubhouses}
                            onChange={option => setSelectedOptions(prev => ({...prev, pubhouses: option}))}
                            applyFilters={applyFilters}
                        />
                    )}
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
            {(['searchVideo'].some(category => currentCategories.includes(category))) && (
                <div className="col-12">
                    <ChannelList/>
                    <ChannelModalRoot/>
                </div>
            )}
            <div className='col-12 d-xl-block d-none'>
                <button className='btn btn-primary w-100' onClick={applyFilters}>Применить параметры</button>
            </div>
        </div>
    );
});

export default Filters;
