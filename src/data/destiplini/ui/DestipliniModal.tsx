import React, {memo, useEffect, useRef, useState} from "react";
import {useAllDestiplini} from "../model/queries";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useCurrentDestiplini} from "../model/hooks";
import Checkbox from "../../../components/core/filter/Checkbox";
import {useArrayQueryParam} from "../../../hooks/useArrayQueryParam";
import {Disciplini} from "../model/types";

export const DestipliniModalRoot = memo(() => {
    const [isModalOpen, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen(prev => !prev);

    return (
        <>
            <button onClick={toggleModal} className="btn btn-outline-primary w-100">
                Выберите дисциплину
            </button>
            {isModalOpen && <DestipliniModal isOpen={isModalOpen} toggleModal={toggleModal} />}
        </>
    );
});

const DestipliniModal = ({ isOpen, toggleModal }: { isOpen: boolean; toggleModal: () => void }) => {
    const arrDirection: string[] = useArrayQueryParam("direction");
    const { data: rawNodes, isLoading } = useAllDestiplini(arrDirection) as {
        data: Disciplini;
        isLoading: boolean;
    };

    const { destiplini = [], set } = useCurrentDestiplini();
    const [selected, setSelected] = useState<string[]>(destiplini);
    const [searchTerm, setSearchTerm] = useState("");

    const allDestiplini = rawNodes?.data || [];
    const filteredDestiplini = allDestiplini
        .filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(({ id, name }) => ({ value: String(id), label: name }));

    const handleApply = () => {
        set(selected);
        toggleModal();
    };

    const handleClearSelection = () => setSelected([]);

    const toggleCheckbox = (value: string) => {
        setSelected(prev =>
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
    };

    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                toggleModal();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, toggleModal]);

    if (!isOpen) return null;

    return (
        <>
            <div className="modal fade show" style={{ display: "block" }} tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-xl" role="document" ref={modalRef}>
                    <div className="modal-content">
                        <div className="modal-header justify-content-between">
                            <h5 className="modal-title">Выберите дисциплину</h5>
                            <button type="button" className="btn close" onClick={toggleModal}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                        <div className="px-3 mb-4">
                            <div className="input-group search-modal">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Поиск по списку"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                                <button className="btn" type="button">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="fs-20" />
                                </button>
                            </div>
                        </div>
                        <div className="modal-body px-3">
                            {filteredDestiplini.map(({ value, label }) => (
                                <Checkbox
                                    shouldShowApply={false}
                                    key={`destiplini-${value}`}
                                    id={`destiplini-${value}`}
                                    label={label}
                                    isChecked={selected.includes(value)}
                                    handleCheckboxChange={() => toggleCheckbox(value)}
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
