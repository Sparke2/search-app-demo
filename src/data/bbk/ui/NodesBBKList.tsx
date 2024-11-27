import {useBbk} from "../model/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {Fragment, memo} from "react";
import {TreeNode} from "../model/types";

export const NodesBBKList = memo(() => {

    const { filterNodesBbkByKeys, bkkSelectedKeys, remove } = useBbk();
    const selectedBBK = filterNodesBbkByKeys(bkkSelectedKeys).filter(Boolean);

    const flattenTree = (nodes: TreeNode[]): TreeNode[] => {
        const result: TreeNode[] = [];

        const traverse = (node: TreeNode) => {
            if (!node) return;

            if (node.children?.length && node.children.length !== node.childrenLen) {
                node.children.forEach(traverse);
            } else {
                result.push(node);
            }
        };

        nodes.forEach(traverse);
        return result;
    };

    const flatTreeNodes = flattenTree(selectedBBK);

    const renderSelectedBBK = () =>
        flatTreeNodes.map((selectedItem) => (
            <div className="list-items-modal" key={selectedItem.key}>
                <div>
                    {selectedItem.label}
                    <button
                        className="btn p-0 ps-2"
                        onClick={() => remove(selectedItem.key)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            </div>
        ));

    return (
        <>
            <h6 className="mb-3">ББК</h6>
            <div className="selected-items-modal">
                {renderSelectedBBK()}
            </div>
        </>
    );
});
