import {useCurrentDirection} from "../model/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {Fragment, memo, useMemo} from "react";
import {useAllDirection} from "../model/queries";
// memo - если копмопнент не принимает объекты в виде пропсов - кеширует компонент
export const DirectionList = memo(({Component, ComponentClassName}) => {
    const {direction, remove} = useCurrentDirection()
    const {data: allDirection = [], isLoading} = useAllDirection()
    const recordDirection = useMemo(() => {
        return allDirection.reduce((acc, curDirection) => {
            acc[curDirection.value] = curDirection.label;
            return acc;
        }, {})
    }, [allDirection])
    const renderSelectedDirection = () => {
        return allDirection && direction.map((selectedItem, key) => {
            if (!recordDirection?.[selectedItem]) return null;
            return (
                <div className="list-items-modal" key={key}>
                    <div key={key}>{recordDirection[selectedItem]}
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
            <h6 className="mb-3">Направление подготовки</h6>
            <div className="selected-items-modal">
                {renderSelectedDirection()}
            </div>
        </Comp>
    )
})
