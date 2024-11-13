import React, {memo, useEffect, useRef, useState} from 'react';
import {useAllDirection} from "../model/queries";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useCurrentDirection} from "../model/hooks";
import Checkbox from "../../../components/Checkbox";

export const DirectionModalRoot = memo(() => {
    const [isModalDirectionOpen, setModalDirectionOpen] = useState(false);
    const toggle = () => {
        setModalDirectionOpen(v => !v)
    }

    const {direction} = useCurrentDirection()
    // если есть направления в урле - грузим их, чо нам ждать то
    const {data} = useAllDirection(!!direction?.length)

    return <>
        <button onClick={toggle} className="btn btn-outline-primary w-100">Выберите направление</button>
        {isModalDirectionOpen && <DirectionModal isOpen={isModalDirectionOpen} toggleModal={toggle}/>}
    </>


})
const DirectionModal = ({isOpen, toggleModal}: {
    isOpen: boolean,
    toggleModal: () => void;
}) => {
    const {data: NodesDirection = []} = useAllDirection()

    const {direction = [], set} = useCurrentDirection()
    const [selected, setSelected] = useState<string[] | undefined>();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredNodesDirection = NodesDirection.filter(node =>
        node.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const recordDirection = NodesDirection.reduce((acc, cur) => {
        acc[cur.value] = (selected || direction).includes(cur.value);
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
        set(selected || direction || [])
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
                            <h5 className="modal-title">Выберите направление подготовки</h5>
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
                            {filteredNodesDirection.map(({value, label}, index) => (
                                <Checkbox
                                    shouldShowApply={false}
                                    key={`direction-${value}`}
                                    id={`direction-${value}`}
                                    label={label}
                                    isChecked={(selected || direction).includes(value)}
                                    handleCheckboxChange={() => {
                                        const isCheked = recordDirection[value];
                                        setSelected((v = direction || []) => isCheked ? v.filter(v => v !== value) : [...v, value])
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

