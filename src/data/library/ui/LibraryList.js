import {useCurrentLibrary} from "../model/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {Fragment, memo, useMemo} from "react";
import {useAllLibrary} from "../model/queries";

export const LibraryList = memo(({Component, ComponentClassName}) => {
    const {library, remove} = useCurrentLibrary()
    const {data: allLibrary = [], isLoading} = useAllLibrary()
    const recordLibrary = useMemo(() => {
        return allLibrary.reduce((acc, curLibrary) => {
            acc[curLibrary.val] = curLibrary.val;
            return acc;
        }, {})
    }, [allLibrary])
    const renderSelectedLibrary = () => {
        return allLibrary && library.map((selectedItem, key) => {
            if (!recordLibrary?.[selectedItem]) return null;
            return (
                <div className="list-items-modal" key={key}>
                    <div key={key}>{recordLibrary[selectedItem]}
                        <button className="btn p-0 ps-2" onClick={() => remove(selectedItem)}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                    </div>

                </div>
            );
        });
    };
    const Comp = Component ? Component : Fragment;
    const props = Component ? {className: ComponentClassName} : undefined;
    return (
        <Comp {...props}>
            <h6 className="mb-3">Каталог архивных фондов</h6>
            <div className="selected-items-modal">
                {renderSelectedLibrary()}
            </div>
        </Comp>
    )
})
