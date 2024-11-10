import React, {useEffect, useRef, useState} from 'react';
import Select from 'react-select';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';

function ReactSelect({
                         shouldApplyButtonRender = true,
                         options,
                         placeholder = undefined,
                         isMulti = false,
                         defaultValue,
                         onChange,
                         styles = [],
                         applyFilters = () => {
                         }
                     }) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const buttonRef = useRef(null);

    const handleChange = (selectedOptions) => {
        if (shouldApplyButtonRender)
            setShowButton(true);
        if (onChange) {
            onChange(selectedOptions);
        }
    };

    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setShowButton(false);
        }
    };

    const handleApplyClick = () => {
        applyFilters();
        setShowButton(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="react-select-container">
            <Select
                options={options}
                isMulti={isMulti}
                placeholder={placeholder}
                defaultValue={defaultValue}
                classNamePrefix="react-select"
                onMenuOpen={() => setMenuIsOpen(true)}
                onMenuClose={() => setMenuIsOpen(false)}
                onChange={handleChange}
                components={{
                    DropdownIndicator: () => (
                        <div className="react-select__dropdown-indicator">
                            {menuIsOpen ? (
                                <FontAwesomeIcon icon={faChevronUp} className="color-grey"/>
                            ) : (
                                <FontAwesomeIcon icon={faChevronDown} className="color-grey"/>
                            )}
                        </div>
                    ),
                }}
            />
            {showButton && (
                <button
                    ref={buttonRef}
                    className="btn-primary apply"
                    onClick={handleApplyClick}
                >
                    Применить
                </button>
            )}
        </div>
    );
}

export default ReactSelect;
