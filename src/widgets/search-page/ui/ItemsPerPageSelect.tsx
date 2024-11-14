import React from "react";
import ReactSelect from "../../../components/core/filter/ReactSelect";

export default function ItemsPerPageSelect({ count, handleCountChange }) {
    return (
        <div className="d-flex gap-4 align-items-center">
            <span className="paginate-text">Элементов на странице:</span>
            <ReactSelect
                key={`count-${count}`}
                shouldApplyButtonRender={false}
                options={[
                    { value: 10, label: '10' },
                    { value: 25, label: '25' },
                    { value: 50, label: '50' },
                    { value: 100, label: '100' },
                ]}
                defaultValue={{ value: count, label: count }}
                onChange={({ value }) => handleCountChange(value)}
            />
        </div>
    );
}
