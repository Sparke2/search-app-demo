import React, { useState, useEffect, useRef } from 'react';

import {TreeChecked} from "../global";
import {useBbk} from "../features/bbk/model/useBbk";
import {useAllBbk} from "../data/bbk/queries";
import {Tree, TreeCheckboxSelectionKeys} from "primereact/tree";
import {Skeleton} from "../shared/ui/Skeleton/Skeleton";
import {useIsFirstRender} from "../shared/utils/isFirst";
export const BBKModalRoot = ({ isOpen, toggleModal }:{isOpen:boolean, toggleModal:() => void}) => {
  const {bkkSelectedKeys:selectedKeys} = useBbk()
  return <BBKModal init={selectedKeys} isOpen={isOpen} toggleModal={toggleModal}/>

}
const BBKModal = ({ isOpen, toggleModal, init }:{isOpen:boolean, toggleModal:() => void;init:Record<string, TreeChecked>}) => {
  const {data:NodesBBK = [], isLoading} = useAllBbk()
  const {apply:applyBBK} = useBbk()
  const selectedKeys = init;
  const [localSelectedKeys, setLocalSelectedKeys] = useState<Record<string,TreeChecked> >(selectedKeys);
  const modalRef = useRef(null);
  const isFirst = useIsFirstRender();
  useEffect(() => {
    if (!isFirst)
      setLocalSelectedKeys(selectedKeys);
  }, [selectedKeys, isFirst]);

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
    applyBBK(localSelectedKeys);
    toggleModal();
  };

  const handleClearSelection = () => {
    setLocalSelectedKeys({});
    applyBBK({})
  };


  if (!isOpen) return null;

  return (
    <>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-xl" role="document" ref={modalRef}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Выберите ББК из списка</h5>
              <button type="button" className="close" onClick={toggleModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">

              {!isLoading?<Tree
                value={NodesBBK}
                selectionMode="checkbox"
                selectionKeys={localSelectedKeys}
                  // @ts-ignore
                onSelectionChange={(e: TreeCheckboxSelectionKeys) => {
                  // @ts-ignore
                  setLocalSelectedKeys(e.value)
                }}
                filter

                filterBy="label"
                className="w-full md:w-30rem"
              />:<Skeleton width='100%' height='125px'/>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleClearSelection}>
                Очистить выбор
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


