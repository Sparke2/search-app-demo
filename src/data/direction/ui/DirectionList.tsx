import {useCurrentDirection} from "../model/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {Fragment, memo, useMemo} from "react";
import {useAllDirection} from "../model/queries";
import {Direction} from "../model/types";
import {useArrayQueryParam} from "../../../hooks/useArrayQueryParam";

export const DirectionList = memo(() => {
    const {direction, remove} = useCurrentDirection()
    const arrUGSN:string[] = useArrayQueryParam('ugsn');
    const {data: rawDirectionData, isLoading} = useAllDirection(arrUGSN) as { data: Direction, isLoading: boolean };
    const allDirectionData = rawDirectionData?.data || [];
    const allDirection = allDirectionData.map(({ id, code, name }) => ({
        value: Number(id),
        label: `${code} ${name}`
    }));
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

    return (
        (allDirection && allDirection.length > 0) && (
            <>
                <h6 className="mb-3">Направление подготовки</h6>
                <div className="selected-items-modal">
                    {renderSelectedDirection()}
                </div>
            </>
        )
    )
})
