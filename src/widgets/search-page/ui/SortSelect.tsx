import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ReactSelect from "../../../components/core/filter/ReactSelect";

export function SearchPage({ name }: { name: string }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [defaultSort, setDefaultSort] = useState<{ value: string; label: string } | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sort = params.get("sort");

        const defaultOption =
            name !== "video"
                ? { value: `${name}year`, label: "году" }
                : { value: "score", label: "релевантности" };

        if (!sort) {
            params.set("sort", defaultOption.value);
            navigate(`${location.pathname}?${params.toString()}`, { replace: true });
        }

        setDefaultSort(sort ? { value: sort, label: getLabel(sort, name) } : defaultOption);
    }, [location.search, name, navigate]);

    const getLabel = (value: string, name: string) => {
        switch (value) {
            case "id":
                return "новизне";
            case "_title_":
                return "алфавиту";
            case `${name}year`:
                return "году";
            case "score":
                return "релевантности";
            default:
                return "релевантности";
        }
    };

    const handleSortChange = (selectedOption: { value: string; label: string }) => {
        const params = new URLSearchParams(location.search);
        params.set("sort", selectedOption.value);
        navigate(`${location.pathname}?${params.toString()}`);
    };

    return (
        <div className="d-flex gap-4 align-items-center filter-select">
            <span className="paginate-text">Сортировка по: </span>
            <ReactSelect
                shouldApplyButtonRender={false}
                options={[
                    ...(name !== "video" ? [{ value: `${name}year`, label: "году" }] : []),
                    { value: "id", label: "новизне" },
                    ...(false ? [{ value: "available", label: "доступности" }] : []),
                    { value: "score", label: "релевантности" },
                    { value: "_title_", label: "алфавиту" },
                ]}
                defaultValue={defaultSort}
                value={defaultSort}
                placeholder={"релевантности"}
                onChange={handleSortChange}
            />
        </div>
    );
}
