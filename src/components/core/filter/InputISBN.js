import React, {useEffect, useRef, useState} from 'react';

function InputISBN({ name, placeholder, value, onChange, applyFilters }) {
    const [showButton, setShowButton] = useState(false);
    const buttonRef = useRef(null);

    const handleChange = (event) => {
        const inputValue = event.target.value;
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

    return (
        <div className="react-select-container">
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className="form-control"
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
