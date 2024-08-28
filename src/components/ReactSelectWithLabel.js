import React, { useState } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function ReactSelectWithLabel({ options, placeholder, value, onChange }) {
  const [isLabelVisible, setLabelVisible] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleFocus = () => {
    setLabelVisible(true);
  };

  const handleBlur = () => {
    setLabelVisible(false);
  };

  return (
    <div className='position-relative'>
      <label className={`label ${isLabelVisible || value ? 'slide-in' : 'slide-out'}`}>
        {placeholder}
      </label>
      <Select
        options={options}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
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
    </div>
  );
}

export default ReactSelectWithLabel;
