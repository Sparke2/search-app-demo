'use client';

import type { FC, ReactNode } from 'react';
import type { Context } from 'use-context-selector';
import { createContext as createReactContext, useContextSelector } from 'use-context-selector';

interface ProviderProps<Value> {
    children: ReactNode;
    value?: Value;
}

export const createContext = <ContextValue, Value>(createStore: (options: Value) => ContextValue) => {
    const ReactContext = createReactContext<ContextValue | null>(null);

    const Provider: FC<ProviderProps<Value>> = ({ children, value }) => {
        const store = createStore(value!);

        return <ReactContext.Provider value={store}>{children}</ReactContext.Provider>;
    };

    const Consumer: FC<{ children: (value: ContextValue) => ReactNode }> = (props) => {
        const { children } = props;
        const value = useContextSelector(ReactContext, (v) => v);

        return children(value!);
    };

    const useStore = <Selected = ContextValue,>(selector: (value: ContextValue) => Selected = (v) => v as unknown as Selected): Selected =>
        useContextSelector<ContextValue, Selected>(ReactContext as Context<ContextValue>, selector);
    return {
        useStore,
        Provider,
        Consumer,
        Context: ReactContext,
    };
};
