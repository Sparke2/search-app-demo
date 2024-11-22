import {useCurrentDestiplini} from "../model/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {memo, useMemo} from "react";
import {useAllDestiplini} from "../model/queries";
import {useArrayQueryParam} from "../../../hooks/useArrayQueryParam";
import {Disciplini} from "../model/types";

export const DestipliniList = memo(() => {
    const {destiplini, remove} = useCurrentDestiplini()
    const arrDirection:string[] = useArrayQueryParam('direction');
    const {data: rawDestipliniData, isLoading} = useAllDestiplini(arrDirection) as { data: Disciplini, isLoading: boolean };
    const allDestipliniData = rawDestipliniData?.data || [];
    const allDestiplini = allDestipliniData.map(({ id, name }) => ({
        value: Number(id),
        label: `${name}`
    }));
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
    return (
        <>
            <h6 className="mb-3">Дисциплины</h6>
            <div className="selected-items-modal">
                {renderSelectedDestiplini()}
            </div>
        </>
    )
})
