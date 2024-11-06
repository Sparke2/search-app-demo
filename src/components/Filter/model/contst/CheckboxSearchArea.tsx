import Checkbox from "../../../Checkbox";
import React from "react";
import {useCategoriesArray} from "../../../../hooks/useCategoriesArray";

export function CheckboxSearchArea({handleCheckboxChange, applyFilters, checkboxes})
{
    const currentCategories = useCategoriesArray();
    return (
        <div className="col-12">

            {(['searchBooks', 'searchPeriodicals', 'searchAudio'].some(category => currentCategories.includes(category)) || currentCategories.length === 0) && (
                <>
                    <h6 className='mb-3'>Область поиска</h6>
                    <Checkbox
                        id="searchAuthor"
                        label="По автору"
                        isChecked={checkboxes?.searchAuthor}
                        handleCheckboxChange={handleCheckboxChange}
                        applyFilters={applyFilters}
                    />
                    <Checkbox
                        id="searchTitle"
                        label="По названию"
                        isChecked={checkboxes?.searchTitle}
                        handleCheckboxChange={handleCheckboxChange}
                        applyFilters={applyFilters}
                    />
                    {(['searchBooks', 'searchPeriodicals'].some(category => currentCategories.includes(category)) || currentCategories.length === 0) && (
                        <Checkbox
                            id="searchInText"
                            label="По тексту"
                            isChecked={checkboxes?.searchInText}
                            handleCheckboxChange={handleCheckboxChange}
                            applyFilters={applyFilters}
                        />
                    )}
                </>
            )}
        </div>
    )
}