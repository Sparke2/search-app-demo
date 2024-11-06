import React, {memo, useEffect, useRef, useState} from 'react';
import {useAllDestiplini} from "../model/queries";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useCurrentDestiplini} from "../model/hooks";
import Checkbox from "../../../components/Checkbox";

export const DestipliniModalRoot = memo(() => {
    const [isModalDestipliniOpen, setModalDestipliniOpen] = useState(false);
    const toggle = () => {
        setModalDestipliniOpen(v => !v)
    }
    // это важно!!
    const {destiplini} = useCurrentDestiplini()
    const {data} = useAllDestiplini(!!destiplini.length)
    return <>
        <button onClick={toggle} className="btn btn-outline-primary w-100">Выберите Десциплину</button>
        <DestipliniModal isOpen={isModalDestipliniOpen} toggleModal={toggle}/>
    </>


})
const DestipliniModal = ({isOpen, toggleModal}: {
    isOpen: boolean,
    toggleModal: () => void;
}) => {
    const {data: NodesDestiplini = []} = useAllDestiplini()

    const {destiplini = [], set} = useCurrentDestiplini()
    const [selected, setSelected] = useState<string[] | undefined>();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredNodesDestiplini = NodesDestiplini.filter(node =>
        node.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const recordDestiplini = NodesDestiplini.reduce((acc, cur) => {
        acc[cur.value] = (selected || destiplini).includes(cur.value);
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
        set(selected || destiplini || [])
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
                            <h5 className="modal-title">Выберите Десциплину из списка</h5>
                            <button type="button" className="btn close" onClick={toggleModal}>
                                <FontAwesomeIcon icon={faXmark}/>
                            </button>
                        </div>
                        <div className="px-3 mb-4">
                            <div className="input-group search-modal">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Поиск по списку"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="btn" type="submit" id="search">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="fs-20"/>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body px-3">
                            {filteredNodesDestiplini.map(({value, label}, index) => (
                                <Checkbox
                                    shouldShowApply={false}
                                    key={`destiplini-${value}`}
                                    id={`destiplini-${value}`}
                                    label={label}
                                    isChecked={(selected || destiplini).includes(value)}
                                    handleCheckboxChange={() => {
                                        const isCheked = recordDestiplini[value]
                                        setSelected((v = destiplini || []) => isCheked ? v.filter(v => v !== value) : [...v, value])
                                    }}
                                    applyFilters={handleApply}
                                />
                            ))}
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


