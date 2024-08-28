import React, { useState } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function ReactSelect({ options, placeholder, isMulti, defaultValue }) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

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
                components={{
                    DropdownIndicator: () => (
                        <div className="react-select__dropdown-indicator">
                            {menuIsOpen ? <FontAwesomeIcon icon={faChevronUp} className='color-grey' />: <FontAwesomeIcon icon={faChevronDown} className='color-grey' />}
                        </div>
                    ),
                }}
            />
        </div>
    );
}

export default ReactSelect;
