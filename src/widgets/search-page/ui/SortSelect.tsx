import ReactSelect from "../../../components/core/filter/ReactSelect";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

export function SearchPage({ name }: { name: string }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleSortChange = (selectedOption) => {
        const params = new URLSearchParams(location.search);
        params.set('sort', selectedOption.value);
        navigate(`${location.pathname}?${params.toString()}`);
    };

    return (
        <div className="d-flex gap-4 align-items-center filter-select">
            <span className="paginate-text">Сортировка по: </span>
            <ReactSelect
                shouldApplyButtonRender={false}
                options={[
                    {value: 'id', label: 'новизне'},
                    ...(false ? [{value: 'available', label: 'доступности'}] : []),
                    {value: 'score', label: 'релевантности'},
                    {value: '_title_', label: 'алфавиту'},
                    ...(name !== "video" ? [{value: `${name}year`, label: 'году'}] : []),
                ]}
                defaultValue={{value: 'score', label: 'релевантности'}}
                placeholder={'релевантности'}
                onChange={handleSortChange}
            />
        </div>
    )
}