import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function ReactSelectWithLabel({ options, placeholder, value, onChange, defaultValue, applyFilters }) {
    const [isLabelVisible, setLabelVisible] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const buttonRef = useRef(null);

    const handleFocus = () => {
        setLabelVisible(true);
    };

    const handleBlur = () => {
        setLabelVisible(false);
    };

    const handleChange = (selectedOptions) => {
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
        <div className='position-relative'>
            <label className={`label ${isLabelVisible || value ? 'slide-in' : 'slide-out'}`}>
                {placeholder}
            </label>
            <Select
                options={options}
                value={value}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                classNamePrefix="react-select"
                onMenuOpen={() => setMenuIsOpen(true)}
                onMenuClose={() => setMenuIsOpen(false)}
                components={{
                    DropdownIndicator: () => (
                        <div className="react-select__dropdown-indicator">
                            {menuIsOpen ? <FontAwesomeIcon icon={faChevronUp} className='color-grey' /> : <FontAwesomeIcon icon={faChevronDown} className='color-grey' />}
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

export default ReactSelectWithLabel;
