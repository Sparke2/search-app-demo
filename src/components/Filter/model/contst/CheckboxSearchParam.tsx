import Checkbox from "../../../Checkbox";
import React from "react";

export function CheckboxSearchParam({handleCheckboxChange, applyFilters, checkboxes})
{
    return (
        <>
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
        </>
    )
}