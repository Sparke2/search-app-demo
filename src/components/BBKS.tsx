
import React from 'react';
import { classNames } from 'primereact/utils';
import { Tree, TreeNodeTemplateOptions, TreeTogglerTemplateOptions } from 'primereact/tree';
import { TreeNode } from 'primereact/treenode';
import NodesBBK from "../filterdata/NodesBBK";
import {useBbk} from "../features/bbk/model/useBbk";

export const BBKS = ()=> {
    const {apply, bkkSelectedKeys, filterNodesBbkByKeys} = useBbk();
    console.log({bkkSelectedKeys})
    const nodeTemplate = (node: TreeNode, options: TreeNodeTemplateOptions) => {
        let label = <b>{node.label}</b>;
        if(!bkkSelectedKeys?.[node.key]?.checked){
            return null;
        }

        // if(!bkkSelectedKeys?.[node.key]?.checked) return null;
        return <span>{label}</span>;
    }

    const togglerTemplate = (node: TreeNode, options: TreeTogglerTemplateOptions) => {
        if (!node) {
            return;
        }
        if(!bkkSelectedKeys?.[node.key]?.checked){
            return null;
        }
        // if(!bkkSelectedKeys?.[node.key]?.checked) return null;

        const expanded = true;
        const iconClassName = classNames('p-tree-toggler-icon pi pi-fw', {
            'pi-caret-right': !expanded,
            'pi-caret-down': expanded
        });

        return (
            //тут можно удаление
            <button type="button"  tabIndex={-1}>
                <span  aria-hidden="false"></span>
            </button>
        );
    };

    return (
        <>
            <div className="card flex justify-content-center">
                <Tree  expandedKeys={bkkSelectedKeys} value={NodesBBK} nodeTemplate={nodeTemplate}
                      togglerTemplate={togglerTemplate} className="w-full md:w-30rem"/>
            <style jsx>{`
                .card ul,li{
                    padding:0 !important;
                }
            `}</style>
            </div>


        </>
    )
}
