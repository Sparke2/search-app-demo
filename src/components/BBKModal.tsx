import React, { useState, useEffect, useRef } from 'react';
import {Tree} from 'primereact/tree';
import NodesBBK from '../filterdata/NodesBBK';
import {TreeChecked} from "../global";
import {useBbk} from "../features/bbk/model/useBbk";

const BBKModal = ({ isOpen, toggleModal }) => {
  const {apply:applyBBK, bkkSelectedKeys:selectedKeys} = useBbk()
  const [localSelectedKeys, setLocalSelectedKeys] = useState<Record<string,TreeChecked> >(() => selectedKeys);
  const modalRef = useRef(null);

  useEffect(() => {
    if(!isOpen){
      setLocalSelectedKeys(selectedKeys)
    }
  }, [isOpen, selectedKeys])
  //
  // useEffect(() => {
  //
  //   if (isOpen) {
  //
  //     const updatedLocalSelectedKeys = selectedKeys;
  //     setLocalSelectedKeys(Object.keys(updatedLocalSelectedKeys).reduce((acc,cur) => {
  //       acc[isPartialCheckedBbkKey(cur)? cur.slice(1):cur] = {checked:selectedKeys[cur] && !isPartialCheckedBbkKey(cur), partialChecked:isPartialCheckedBbkKey(cur)} as TreeChecked
  //       return acc;
  //     }, {}) );
  //   }
  // }, [isOpen, selectedKeys]);

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
    // const selectedKeysArray = Object.keys(localSelectedKeys).map(v=>localSelectedKeys[v].partialChecked?`-${v}`:localSelectedKeys[v].checked? v:undefined).filter(Boolean)
    // const selectedItems = NodesBBK.filter((node) => selectedKeysArray.includes(node.key));
    applyBBK(localSelectedKeys);
    //
    // const searchParams = new URLSearchParams(window.location.search);
    // if (selectedKeysArray.length > 0) {
    //   searchParams.set('bbk', selectedKeysArray.join(','));
    // } else {
    //   searchParams.delete('bbk');
    // }

    // navigate({ search: searchParams.toString() });
    toggleModal();
  };

  const handleClearSelection = () => {
    setLocalSelectedKeys({});
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

              <Tree
                value={NodesBBK}
                selectionMode="checkbox"
                selectionKeys={localSelectedKeys}
                onSelectionChange={(e) => {
                  // @ts-ignore
                  setLocalSelectedKeys(e.value)
                }}
                filter

                filterBy="label"
                className="w-full md:w-30rem"
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                Закрыть
              </button>
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

export default BBKModal;
