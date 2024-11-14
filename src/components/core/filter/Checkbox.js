import React, {useEffect, useRef, useState} from 'react';

function Checkbox({
                      shouldShowApply = true,
                      id, label, isChecked, handleCheckboxChange, applyFilters = () => {
    }
                  }) {
    const [showButton, setShowButton] = useState(false);
    const buttonRef = useRef(null);

    const handleChange = () => {
        handleCheckboxChange(id);
        if (shouldShowApply)
            setShowButton(true);
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
        <div className="form-check position-relative">
            <input
                className="form-check-input"
                type="checkbox"
                id={id}
                checked={isChecked}
                onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={id}>
                {label}
            </label>
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

export default Checkbox;
