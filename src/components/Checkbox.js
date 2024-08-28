import React, { useState, useEffect, useRef } from 'react';

function Checkbox({ id, label, checked }) {
    const [showButton, setShowButton] = useState(false);
    const buttonRef = useRef(null);

    const handleCheckboxChange = () => {
        setShowButton(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setShowButton(false);
        }
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
                defaultChecked={checked}
                onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={id}>
                {label}
            </label>
            {showButton && (
                <button
                    ref={buttonRef}
                    className='btn-primary apply'
                    onClick={() => setShowButton(false)}
                >
                    Применить
                </button>
            )}
        </div>
    );
}

export default Checkbox;
