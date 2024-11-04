import React, {useEffect, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useIsFirstRender} from "../../shared/utils/isFirst";
import {useCurrentUGSN} from "../../data/ugsn/model/hooks";
import Checkbox from "../Checkbox";
import {useAllUGSN} from "../../data/ugsn/model/queries";

export const UGSNModalRoot = ({isOpen, toggleModal}: { isOpen: boolean, toggleModal: () => void }) => {
    // const {bkkSelectedKeys:selectedKeys} = useAllUGSN()
    return <UGSNModal isOpen={isOpen} toggleModal={toggleModal}/>

}
const UGSNModal = ({isOpen, toggleModal}: {
    isOpen: boolean,
    toggleModal: () => void;
    init: Record<string, { value: string, label: string }>
}) => {
    const {data: NodesUGSN = []} = useAllUGSN()
    const {add: applyUGSN, remove} = useCurrentUGSN()
    // const [localSelectedKeys, setLocalSelectedKeys] = useState<Record<string,TreeChecked> >(selectedKeys);
    const modalRef = useRef(null);
    const isFirst = useIsFirstRender();


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
        // applyUGSN(localSelectedKeys);
        toggleModal();
    };

    const handleClearSelection = () => {
        // setLocalSelectedKeys({});
        // applyUGSN({})
    };


    if (!isOpen) return null;

    return (
        <>
            <div className="modal fade show" style={{display: 'block'}} tabIndex={-1} role="dialog">
                <div className="modal-dialog modal-xl" role="document" ref={modalRef}>
                    <div className="modal-content">
                        <div className="modal-header justify-content-between">
                            <h5 className="modal-title">Выберите ББК из списка</h5>
                            <button type="button" className="btn close" onClick={toggleModal}>
                                <FontAwesomeIcon icon={faXmark}/>
                            </button>
                        </div>
                        <div className="modal-body">

                            {NodesUGSN.map(v => <div>
                                <Checkbox/>
                            </div>)}
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


