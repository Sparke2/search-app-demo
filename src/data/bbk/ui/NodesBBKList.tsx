import {useBbk} from "../model/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import React, {ComponentProps, ComponentType, Fragment, memo} from "react";
import {TreeNode} from "../model/types";
import {getAllBkkOptions} from "../model/queries";
import {useQuery} from "@tanstack/react-query";
// memo - если копмопнент не принимает объекты в виде пропсов - кеширует компонент
export const NodesBBKList = memo(({Component, ComponentClassName}: {
    Component?: ComponentType<ComponentProps<'div'>>,
    ComponentClassName?: string
}) => {
    const {data: NodeBBK = []} = useQuery({...getAllBkkOptions(), select: v => v.data})
    const {filterNodesBbkByKeys, bkkSelectedKeys, remove} = useBbk()
    const selectedBBK = filterNodesBbkByKeys(bkkSelectedKeys).filter(Boolean);

    const flattenTree = (nodes: TreeNode[]) => {
        const result = [] as TreeNode[];

        const traverse = (node: TreeNode) => {
            if (!node) return;
            if (!node.children.length) {
                result.push(node)
                return;
            }

            if (node.children && node.children.length !== node.childrenLen) {
                node.children.forEach(child => traverse(child)); // Рекурсивно проходим по дочерним узлам
            } else {
                // Если children длина равна childrenLen, добавляем текущий узел в результат
                result.push(node);
            }
        };

        nodes.forEach(node => traverse(node));
        return result;
    };

    const flatTreeNodes = flattenTree(selectedBBK);
    const renderSelectedBBK = () => {
        return flatTreeNodes.map((selectedItem, key) => {
            const nodeChildrenLength = NodeBBK[key]?.children?.length || 0;
            const selectedChildrenLength = selectedItem.childrenLen
            if (true) {
                return (
                    <div className="list-items-modal" key={key}>
                        <div key={key}>{selectedItem.label}
                            <button className="btn p-0 ps-2" onClick={() => remove(selectedItem.key)}>
                                <FontAwesomeIcon icon={faXmark}/>
                            </button>
                        </div>

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
    const Comp = Component ? Component : Fragment; //Fragment - <></>
    const props = Component ? {className: ComponentClassName} : undefined;
    //если Component задала - можно кидать classnAME, иначе - <></> без className
    return (
        <Comp {...props}>
            <h6 className="mb-3">ББК</h6>
            <div className="selected-items-modal">
                {/*{selectedBBK.length > 0 && (*/}
                {/*    <div className="list-items-modal">*/}
                {/*        {flatTreeNodes.map((item) => (*/}
                {/*            bkkSelectedKeys[item.key]?.partialChecked ? null :*/}
                {/*                <div key={item.key}>*/}
                {/*                    {item.label}*/}
                {/*                    <button className="btn p-0 ps-2" onClick={() => remove(item.key)}>*/}
                {/*                        <FontAwesomeIcon icon={faXmark}/>*/}
                {/*                    </button>*/}
                {/*                </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*)}*/}
                {renderSelectedBBK()}
            </div>
        </Comp>
    )
})
