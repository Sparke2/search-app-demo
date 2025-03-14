import Checkbox from "../../../core/filter/Checkbox";
import React from "react";
import {useCategoriesArray} from "../../../../hooks/useCategoriesArray";

export function CheckboxSearchArea({handleCheckboxChange, applyFilters, checkboxes}) {
    const currentCategories = useCategoriesArray();
    return (
        <>
            {(['searchBooks', 'searchPeriodicals', 'searchAudio', 'searchVideo', 'searchArchives'].some(category => currentCategories.includes(category)) || currentCategories.length === 0) && (
                <div className="col-lg-12 col-6">
                    <h6 className='mb-3'>Область поиска</h6>
                    {(['searchBooks'].some(category => currentCategories.includes(category)) || currentCategories.length === 0) && (
                        <Checkbox
                            id="author"
                            label="По автору"
                            isChecked={checkboxes?.author}
                            handleCheckboxChange={handleCheckboxChange}
                            applyFilters={applyFilters}
                        />
                    )}
                    <Checkbox
                        id="title"
                        label="По названию"
                        isChecked={checkboxes?.title}
                        handleCheckboxChange={handleCheckboxChange}
                        applyFilters={applyFilters}
                    />

                    <Checkbox
                        id="description"
                        label="По тексту аннотаций"
                        isChecked={checkboxes?.description}
                        handleCheckboxChange={handleCheckboxChange}
                        applyFilters={applyFilters}
                    />
                </div>
            )}
        </>
    )
}