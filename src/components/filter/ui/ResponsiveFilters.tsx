import React, {useRef} from 'react';
import Filters from '../Filters';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

export const ResponsiveFilters: React.FC = () => {
    const filtersRef = useRef(null);

    const handleApplyFilters = () => {
        if (filtersRef.current) {
            filtersRef.current.applyFilters();
        }
    };
    return (
        <div className="col-lg-3 filter-field order-lg-2 order-1">
            <button
                className="btn btn-primary filter-toggle-btn d-lg-none"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#filtersOffcanvas"
                aria-controls="filtersOffcanvas"
                style={{
                    position: 'fixed',
                    top: '40%',
                    right: '1rem',
                    zIndex: 100,
                    width: '46px',
                }}
            >
                <FontAwesomeIcon icon={faBars} />
            </button>
            <div
                className="offcanvas offcanvas-start"
                tabIndex={-1}
                id="filtersOffcanvas"
                aria-labelledby="filtersOffcanvasLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="filtersOffcanvasLabel">
                        Фильтры
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <Filters ref={filtersRef}/>
                </div>
                <div className="offcanvas-footer px-4 py-2">
                    <button className='btn btn-primary w-100' onClick={handleApplyFilters} data-bs-dismiss="offcanvas">Применить параметры</button>
                </div>
            </div>

            <div className="d-none d-lg-block">
                <Filters ref={filtersRef}/>
            </div>
        </div>
    );
};
