import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NodesBBK from '../filterdata/NodesBBK';

const BBKContext = createContext();

export const useBBK = () => useContext(BBKContext);

export const BBKProvider = ({ children }) => {
    const [selectedBBK, setSelectedBBK] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState({});
    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const bbkKeys = searchParams.get('bbk')?.split(',') || [];
        const updatedKeys = bbkKeys.reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        let selectedItems = NodesBBK.filter((node,index) => {
            return bbkKeys.includes(node.key)
        })
        const bbkKeysOnlyChildren = bbkKeys.filter((node,index) => node.length>1)
        selectedItems = NodesBBK.map((node,index) => ({...node, children: node.children.filter(child=>bbkKeysOnlyChildren.includes(child.key))}))
        setSelectedBBK(selectedItems.filter(v=>v.children.length));
        setSelectedKeys(updatedKeys);
    }, [location.search]);

    const applyBBK = (items, keys) => {
        setSelectedBBK(items);
        setSelectedKeys(keys);
    };

    const removeBBK = (key) => {
        setSelectedKeys((prevKeys) => {
            const newKeys = { ...prevKeys };
            delete newKeys[key];
            const bbkKeys = Object.keys(newKeys).filter(k => newKeys[k]);

            const searchParams = new URLSearchParams(window.location.search);
            if (bbkKeys.length > 0) {
                searchParams.set('bbk', bbkKeys.join(','));
            } else {
                searchParams.delete('bbk');
            }

            window.history.replaceState(null, '', `?${searchParams.toString()}`);
            const filteredItems = selectedBBK.filter(item => item.key !== key);
            setSelectedBBK(filteredItems);

            return newKeys;
        });
    };
    return (
        <BBKContext.Provider value={{ selectedBBK, selectedKeys, applyBBK, removeBBK }}>
            {children}
        </BBKContext.Provider>
    );
};
export const useBBKV2 = () => {
    const location = useLocation()
}
