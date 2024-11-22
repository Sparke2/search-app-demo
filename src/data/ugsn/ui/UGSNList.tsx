import {useCurrentUGSN} from "../model/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {Fragment, memo, useMemo} from "react";
import {useAllUGSN} from "../model/queries";
import {UGSN} from "../model/types";

export const UGSNList = memo(() => {
    const {ugsn, remove} = useCurrentUGSN()
    const { data: rawUgsnData, isLoading } = useAllUGSN() as { data: UGSN, isLoading: boolean };
    const allUgsnData = rawUgsnData?.data || [];
    const allUgsn = allUgsnData.map(({ id, code, name }) => ({
        value: Number(id),
        label: `${code} ${name}`
    }));

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
    return (
        <>
            <h6 className="mb-3">Укрепленная группа специальностей</h6>
            <div className="selected-items-modal">
                {renderSelectedUGSN()}
            </div>
        </>
    )
})
