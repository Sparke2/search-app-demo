import Checkbox from "../../../core/filter/Checkbox";
import React from "react";

export function CheckboxSearchParam({handleCheckboxChange, applyFilters, checkboxes})
{
    return (
        <div className="col-12">
            <h6 className='mb-3'>Поиск по</h6>
            {
                [
                    {value: 'searchBooks', label: 'Книгам'},
                    {value: 'searchPeriodicals', label: 'Журналам'},
                    {value: 'searchAudio', label: 'Аудио'},
                    {value: 'searchVideo', label: 'Видео'},
                    {value: 'searchArchives', label: 'Архивам'}
                ].map(({value, label}) => (
                    <Checkbox
                        key={value}
                        id={value}
                        label={label}
                        isChecked={checkboxes?.[value]}
                        handleCheckboxChange={handleCheckboxChange}
                        applyFilters={applyFilters}
                    />
                ))
            }
        </div>
    )
}