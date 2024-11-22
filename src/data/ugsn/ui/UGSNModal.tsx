import React, {memo, useEffect, useRef, useState} from "react";
import {useAllUGSN} from "../model/queries";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useCurrentUGSN} from "../model/hooks";
import Checkbox from "../../../components/core/filter/Checkbox";
import {UGSN} from "../model/types";

export const UGSNModalRoot = memo(() => {
    const [isModalUGSNOpen, setModalUGSNOpen] = useState(false);
    const toggle = () => setModalUGSNOpen((v) => !v);

    return (
        <>
            <button onClick={toggle} className="btn btn-outline-primary w-100">
                Выберите УГСН
            </button>
            {isModalUGSNOpen && (
                <UGSNModal isOpen={isModalUGSNOpen} toggleModal={toggle} />
            )}
        </>
    );
});

const UGSNModal = ({ isOpen, toggleModal }: { isOpen: boolean; toggleModal: () => void }) => {
    const { data: rawUgsnData, isLoading } = useAllUGSN() as { data: UGSN; isLoading: boolean };
    const allUgsnData = rawUgsnData?.data || [];
    const NodesUGSN = allUgsnData.map(({ id, code, name }) => ({
        value: String(id),
        label: `${code} ${name}`,
    }));

    const { ugsn = [], set } = useCurrentUGSN();

    const [selected, setSelected] = useState<string[]>(ugsn);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredNodesUGSN = NodesUGSN.filter((node) =>
        node.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const modalRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                toggleModal();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, toggleModal]);

    const handleApply = () => {
        toggleModal();
        set(selected);
    };

    const handleClearSelection = () => {
        setSelected([]);
    };

    const handleCheckboxChange = (value: string) => {
        setSelected((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal fade show" style={{ display: "block" }} tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-xl" role="document" ref={modalRef}>
                    <div className="modal-content">
                        <div className="modal-header justify-content-between">
                            <h5 className="modal-title">Выберите УГСН из списка</h5>
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
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="btn" type="submit" id="search">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="fs-20" />
                                </button>
                            </div>
                        </div>
                        <div className="modal-body px-3">
                            {filteredNodesUGSN.map(({ value, label }) => (
                                <Checkbox
                                    key={`ugsn-${value}`}
                                    id={`ugsn-${value}`}
                                    label={label}
                                    isChecked={selected.includes(value)}
                                    handleCheckboxChange={() => handleCheckboxChange(value)}
                                />
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={handleClearSelection}
                            >
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
