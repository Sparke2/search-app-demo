import {useCurrentChannel} from "../model/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {Fragment, memo, useMemo} from "react";
import {useAllChannel} from "../model/queries";

export const ChannelList = memo(({Component, ComponentClassName}) => {
    const {channel, remove} = useCurrentChannel()
    const {data: allChannel = [], isLoading} = useAllChannel()
    const recordChannel = useMemo(() => {
        return allChannel.reduce((acc, curChannel) => {
            acc[curChannel.value] = curChannel.label;
            return acc;
        }, {})
    }, [allChannel])
    const renderSelectedChannel = () => {
        return allChannel && channel.map((selectedItem, key) => {
            if (!recordChannel?.[selectedItem]) return null;
            return (
                <div className="list-items-modal" key={key}>
                    <div key={key}>{recordChannel[selectedItem]}
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
            <h6 className="mb-3">Каталог видеоресурсов</h6>
            <div className="selected-items-modal">
                {renderSelectedChannel()}
            </div>
        </Comp>
    )
})
