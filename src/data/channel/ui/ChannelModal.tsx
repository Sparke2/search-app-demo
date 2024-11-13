import React, {memo, useEffect, useRef, useState} from 'react';
import {useAllChannel} from "../model/queries";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useCurrentChannel} from "../model/hooks";
import Checkbox from "../../../components/Checkbox";
import {Filter} from "../../filter/model/types";

export const ChannelModalRoot = memo(() => {
    const [isModalChannelOpen, setModalChannelOpen] = useState(false);
    const toggle = () => {
        setModalChannelOpen(v => !v)
    }
    return <>
        <button onClick={toggle} className="btn btn-outline-primary w-100">Выберите канал</button>
        <ChannelModal isOpen={isModalChannelOpen} toggleModal={toggle}/>
    </>
})

const ChannelModal = ({isOpen, toggleModal}: {
    isOpen: boolean,
    toggleModal: () => void;
}) => {
    const {data: NodesChannel = []} = useAllChannel() as { data: Filter[] };

    const {channel = [], set} = useCurrentChannel()
    const [selected, setSelected] = useState<string[] | undefined>();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredNodesChannel = NodesChannel.filter(node =>
        node.val.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const recordChannel = NodesChannel.reduce((acc, cur) => {
        acc[cur.val] = (selected || channel).includes(cur.val);
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
        set(selected || channel || [])
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
                            {filteredNodesChannel.map(({val}, index) => (
                                <Checkbox
                                    shouldShowApply={false}
                                    key={`channel-${val}`}
                                    id={`channel-${val}`}
                                    label={val}
                                    isChecked={(selected || channel).includes(val)}
                                    handleCheckboxChange={() => {
                                        const isCheked = recordChannel[val]
                                        setSelected((v = channel || []) => isCheked ? v.filter(v => v !== val) : [...v, val])
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


