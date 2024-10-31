import React, { useState, useRef, useEffect } from 'react';

function InputISBN({ name, placeholder, value, onChange, applyFilters }) {
    const [formattedValue, setFormattedValue] = useState('');
    const [showButton, setShowButton] = useState(false);

    const buttonRef = useRef(null);

    useEffect(() => {
        if (value) {
            setFormattedValue(applyISBNDashes(value));
        }
    }, [value]);

    const handleChange = (event) => {
        let inputValue = event.target.value.replace(/\D/g, '');

        setFormattedValue(applyISBNDashes(inputValue));
        setShowButton(true);

        if (onChange) {
            onChange(inputValue);
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

    // Функция для добавления дефисов к числовому значению
    const applyISBNDashes = (input) => {
        if (input.length <= 3) return input;
        if (input.length <= 4) return `${input.slice(0, 3)}-${input.slice(3)}`;
        if (input.length <= 7) return `${input.slice(0, 3)}-${input.slice(3, 4)}-${input.slice(4)}`;
        if (input.length <= 12) return `${input.slice(0, 3)}-${input.slice(3, 4)}-${input.slice(4, 7)}-${input.slice(7)}`;
        return `${input.slice(0, 3)}-${input.slice(3, 4)}-${input.slice(4, 7)}-${input.slice(7, 12)}-${input.slice(12, 13)}`;
    };

    return (
        <div className="react-select-container">
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={formattedValue}
                onChange={handleChange}
                className="form-control"
                maxLength={17}
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

export default InputISBN;
