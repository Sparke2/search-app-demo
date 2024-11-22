import React, {memo, useEffect, useRef, useState} from "react";
import {useAllDirection} from "../model/queries";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useCurrentDirection} from "../model/hooks";
import Checkbox from "../../../components/core/filter/Checkbox";
import {Direction} from "../model/types";
import {useArrayQueryParam} from "../../../hooks/useArrayQueryParam";

export const DirectionModalRoot = memo(() => {
    const [isModalDirectionOpen, setModalDirectionOpen] = useState(false);
    const toggleModal = () => setModalDirectionOpen((prev) => !prev);

    const arrUGSN: string[] = useArrayQueryParam("ugsn");
    const { data: rawDirectionData } = useAllDirection(arrUGSN) as {
        data: Direction;
    };

    const allDirectionData = rawDirectionData?.data || [];
    const allDirections = allDirectionData.map(({ id, code, name }) => ({
        value: Number(id),
        label: `${code} ${name}`,
    }));

    return allDirections.length > 0 ? (
        <>
            <button onClick={toggleModal} className="btn btn-outline-primary w-100">
                Выберите направление
            </button>
            {isModalDirectionOpen && (
                <DirectionModal
                    isOpen={isModalDirectionOpen}
                    toggleModal={toggleModal}
                    allDirections={allDirections}
                />
            )}
        </>
    ) : null;
});

const DirectionModal = ({
                            isOpen,
                            toggleModal,
                            allDirections,
                        }: {
    isOpen: boolean;
    toggleModal: () => void;
    allDirections: { value: number; label: string }[];
}) => {
    const { direction = [], set } = useCurrentDirection();
    const [selected, setSelected] = useState<string[]>(direction);
    const [searchTerm, setSearchTerm] = useState("");

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
        set(selected);
        toggleModal();
    };

    const handleClearSelection = () => {
        setSelected([]);
    };

    const filteredDirections = allDirections.filter((direction) =>
        direction.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <>
            <div className="modal fade show" style={{ display: "block" }} tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-xl" role="document" ref={modalRef}>
                    <div className="modal-content">
                        <div className="modal-header justify-content-between">
                            <h5 className="modal-title">Выберите направление подготовки</h5>
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
                                <button className="btn" type="submit">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="fs-20" />
                                </button>
                            </div>
                        </div>
                        <div className="modal-body px-3">
                            {filteredDirections.map(({ value, label }) => (
                                <Checkbox
                                    key={`direction-${value}`}
                                    id={`direction-${value}`}
                                    label={label}
                                    isChecked={selected.includes(value.toString())}
                                    handleCheckboxChange={() => {
                                        setSelected((prev) =>
                                            prev.includes(value.toString())
                                                ? prev.filter((v) => v !== value.toString())
                                                : [...prev, value.toString()]
                                        );
                                    }}
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
