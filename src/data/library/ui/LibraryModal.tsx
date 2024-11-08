import React, {memo, useEffect, useRef, useState} from 'react';
import {useAllLibrary} from "../model/queries";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useCurrentLibrary} from "../model/hooks";
import Checkbox from "../../../components/Checkbox";

export const LibraryModalRoot = memo(() => {
    const [isModalLibraryOpen, setModalLibraryOpen] = useState(false);
    const toggle = () => {
        setModalLibraryOpen(v => !v)
    }
    const {library} = useCurrentLibrary()
    const {data} = useAllLibrary(!!library.length)
    return <>
        <button onClick={toggle} className="btn btn-outline-primary w-100">Выберите издание</button>
        <LibraryModal isOpen={isModalLibraryOpen} toggleModal={toggle}/>
    </>


})
const LibraryModal = ({isOpen, toggleModal}: {
    isOpen: boolean,
    toggleModal: () => void;
}) => {
    const {data: NodesLibrary = []} = useAllLibrary()

    const {library = [], set} = useCurrentLibrary()
    const [selected, setSelected] = useState<string[] | undefined>();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredNodesLibrary = NodesLibrary.filter(node =>
        node.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const recordLibrary = NodesLibrary.reduce((acc, cur) => {
        acc[cur.value] = (selected || library).includes(cur.value);
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
        toggleModal();
        set(selected || library || [])
    };

    const handleClearSelection = () => {
        setSelected([])
    };


    if (!isOpen) return null;

    return (
        <>
            <div className="modal fade show" style={{display: 'block'}} tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-xl" role="document" ref={modalRef}>
                    <div className="modal-content">
                        <div className="modal-header justify-content-between">
                            <h5 className="modal-title">Выберите канал из списка</h5>
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
                            {filteredNodesLibrary.map(({value, label}, index) => (
                                <Checkbox
                                    shouldShowApply={false}
                                    key={`library-${value}`}
                                    id={`library-${value}`}
                                    label={label}
                                    isChecked={(selected || library).includes(value)}
                                    handleCheckboxChange={() => {
                                        const isCheked = recordLibrary[value]
                                        setSelected((v = library || []) => isCheked ? v.filter(v => v !== value) : [...v, value])
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

