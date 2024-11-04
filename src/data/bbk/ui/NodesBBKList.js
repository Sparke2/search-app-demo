import {useBbk} from "../model/hooks";
import {mockNodesBbk as NodeBBK} from "../model/mock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {Fragment, memo, useMemo} from "react";
// memo - если копмопнент не принимает объекты в виде пропсов - кеширует компонент
export const NodesBBKList = memo(({Component, ComponentClassName}) => {
    const {filterNodesBbkByKeys, bkkSelectedKeys, remove} = useBbk()
    const selectedBBK = filterNodesBbkByKeys(bkkSelectedKeys).filter(Boolean)
    const renderSelectedBBK = () => {
        return selectedBBK.map((selectedItem, key) => {
            const nodeChildrenLength = NodeBBK[key]?.children?.length || 0;
            const selectedChildrenLength = selectedItem?.length || 0;
            if (nodeChildrenLength !== selectedChildrenLength) {
                return (
                    <div className="list-items-modal" key={key}>
                        {selectedItem.children.map((child, index) => (
                            <div key={index}>{child.label}
                                <button className="btn p-0 ps-2" onClick={() => remove(child.key)}>
                                    <FontAwesomeIcon icon={faXmark}/>
                                </button>
                            </div>

                        ))}
                    </div>
                );
            } else {
                return (
                    <div key={key}>
                        <span>{selectedItem.label}</span>
                    </div>
                );
            }
        });
    };
    const Comp = Component?Component:Fragment; //Fragment - <></>
    const props = Component? {className:ComponentClassName}:undefined;
    //если Component задала - можно кидать classnAME, иначе - <></> без className
    return (
        <Comp {...props}>
            <h6 className="mb-3">ББК</h6>
            <div className="selected-items-modal">
                {selectedBBK.length > 0 && (
                    <div className="list-items-modal">
                        {selectedBBK.map((item) => (
                            bkkSelectedKeys[item.key]?.partialChecked ? null :
                                <div key={item.key}>
                                    {item.label}
                                    <button className="btn p-0 ps-2" onClick={() => remove(item.key)}>
                                        <FontAwesomeIcon icon={faXmark}/>
                                    </button>
                                </div>
                        ))}
                    </div>
                )}
                {renderSelectedBBK(NodeBBK, selectedBBK)}
            </div>
        </Comp>
    )
})
