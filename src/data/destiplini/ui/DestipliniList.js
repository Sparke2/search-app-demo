import {useCurrentDestiplini} from "../model/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {Fragment, memo, useMemo} from "react";
import {useAllDestiplini} from "../model/queries";
// memo - если копмопнент не принимает объекты в виде пропсов - кеширует компонент
export const DestipliniList = memo(({Component, ComponentClassName}) => {
    const {destiplini, remove} = useCurrentDestiplini()
    const {data: allDestiplini = [], isLoading} = useAllDestiplini()
    const recordDestiplini = useMemo(() => {
        return allDestiplini.reduce((acc, curDestiplini) => {
            acc[curDestiplini.value] = curDestiplini.label;
            return acc;
        }, {})
    }, [allDestiplini])
    const renderSelectedDestiplini = () => {
        return allDestiplini && destiplini.map((selectedItem, key) => {
            if (!recordDestiplini?.[selectedItem]) return null;
            return (
                <div className="list-items-modal" key={key}>
                    <div key={key}>{recordDestiplini[selectedItem]}
                        <button className="btn p-0 ps-2" onClick={() => remove(selectedItem)}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                    </div>

                </div>
            );
        });
    };
    // вместо Component можно вставить 'div'
    const Comp = Component ? Component : Fragment; //Fragment - <></>
    const props = Component ? {className: ComponentClassName} : undefined;
    //если Component задала - можно кидать classnAME, иначе - <></> без className
    return (
        <Comp {...props}>
            <h6 className="mb-3">Дисциплины</h6>
            <div className="selected-items-modal">
                {renderSelectedDestiplini()}
            </div>
        </Comp>
    )
})
