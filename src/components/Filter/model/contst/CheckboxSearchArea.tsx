import Checkbox from "../../../Checkbox";
import React from "react";

export function CheckboxSearchArea({handleCheckboxChange, applyFilters, checkboxes})
{
    return (
        <>
            {
                [
                    {value: 'searchAuthor', label: 'По автору'},
                    {value: 'searchTitle', label: 'По названию'},
                    {value: 'searchInText', label: 'По тексту'}
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