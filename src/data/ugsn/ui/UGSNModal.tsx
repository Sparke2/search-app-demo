import React, {memo, useEffect, useRef, useState} from 'react';
import {useAllUGSN} from "../model/queries";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useCurrentUGSN} from "../model/hooks";
import Checkbox from "../../../components/Checkbox";

export const UGSNModalRoot = memo(() => {
    const [isModalUGSNOpen, setModalUGSNOpen] = useState(false);
    const toggle = () => {
        setModalUGSNOpen(v => !v)
    }
    const {ugsn} = useCurrentUGSN()
    // если есть в урле угсн - фетч на бэк до открытия
    const {data} = useAllUGSN(!!ugsn.length || isModalUGSNOpen)
    return <>
        <button onClick={toggle} className="btn btn-outline-primary w-100">Выберите УГСН</button>
        {isModalUGSNOpen && <UGSNModal isOpen={isModalUGSNOpen} toggleModal={toggle}/>}
    </>


})
const UGSNModal = ({isOpen, toggleModal}: {
    isOpen: boolean,
    toggleModal: () => void;
}) => {
    const {data: NodesUGSN = []} = useAllUGSN(isOpen)

    const {ugsn = [], set} = useCurrentUGSN()

    const [selected, setSelected] = useState<string[] | undefined>();

    const recordUGSN = NodesUGSN.reduce((acc, cur) => {
        acc[cur.value] = (selected || ugsn).includes(cur.value);
        return acc;
    }, {}) as Record<string, boolean> | {}

    const modalRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                toggleModal();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleModal]);

    const handleApply = () => {
        // applyBBK(localSelectedKeys);
        toggleModal();
        set(selected || ugsn || [])
    };

    const handleClearSelection = () => {
        // setLocalSelectedKeys({});
        setSelected([])
        // applyBBK({})
    };


    if (!isOpen) return null;

    return (
        <>

            <div className="modal fade show" style={{display: 'block'}} tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-xl" role="document" ref={modalRef}>
                    <div className="modal-content">
                        <div className="modal-header justify-content-between">
                            <h5 className="modal-title">Выберите УГСН из списка</h5>
                            <button type="button" className="btn close" onClick={toggleModal}>
                                <FontAwesomeIcon icon={faXmark}/>
                            </button>
                        </div>
                        <div className="modal-body ">
                            <div className='w-full md:w-30rem'>

                                {NodesUGSN.map(({value, label}, index) => (
                                    <Checkbox
                                        shouldShowApply={false}
                                        key={`ugsn-${value}`}
                                        id={`ugsn-${value}`}
                                        label={label}
                                        isChecked={(selected || ugsn).includes(value)}
                                        handleCheckboxChange={() => {
                                            const isCheked = recordUGSN[value]
                                            setSelected((v = ugsn || []) => isCheked ? v.filter(v => v !== value) : [...v, value])
                                        }}
                                        applyFilters={handleApply}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-primary" onClick={handleClearSelection}>
                                Очистить
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleApply}>
                                Применить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
};


