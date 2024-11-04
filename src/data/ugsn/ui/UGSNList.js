import {useCurrentUGSN} from "../model/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {Fragment, memo, useMemo} from "react";
import {useAllUGSN} from "../model/queries";
// memo - если копмопнент не принимает объекты в виде пропсов - кеширует компонент
export const UGSNList = memo(({Component, ComponentClassName}) => {
    const {ugsn, remove} = useCurrentUGSN()
    console.log({ugsn})
    const {data: allUgsn = [], isLoading} = useAllUGSN(!!ugsn?.length)
    const recordUgsn = useMemo(() => {
        return allUgsn.reduce((acc, curUgsn) => {
            acc[curUgsn.value] = curUgsn.label;
            return acc;
        }, {})
    }, [allUgsn])
    const renderSelectedUGSN = () => {
        return allUgsn && ugsn.map((selectedItem, key) => {
            if (!recordUgsn?.[selectedItem]) return null;
            return (
                <div className="list-items-modal" key={key}>
                    <div key={key}>
                        {recordUgsn[selectedItem]}
                        <button className="btn p-0 ps-2" onClick={() => remove(selectedItem)}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                    </div>

                </div>
            );
        });
    };
    const Comp = Component ? Component : Fragment; //Fragment - <></>
    const props = Component ? {className: ComponentClassName} : undefined;
    //если Component задала - можно кидать classnAME, иначе - <></> без className
    return (
        <Comp {...props}>
            <h6 className="mb-3">Укрепленная группа специальностей</h6>
            <div className="selected-items-modal">
                {renderSelectedUGSN()}
            </div>
        </Comp>
    )
})
