'use client';

import {FC, ReactNode} from 'react';
import type {Context} from 'use-context-selector';
import {createContext as createReactContext, useContextSelector} from 'use-context-selector';

interface ProviderProps<Value> {
    children: ReactNode;
    value?: Value;
}

export const createContext = <ContextValue, Value>(createStore: (options: Value) => ContextValue) => {
    const ReactContext = createReactContext<ContextValue | null>(null);

    const Provider: FC<ProviderProps<Value>> = ({children, value}) => {
        const store = createStore(value!);

        return <ReactContext.Provider value={store}>{children}</ReactContext.Provider>;
    };

    const Consumer: FC<{ children: (value: ContextValue) => ReactNode }> = (props) => {
        const {children} = props;
        const value = useContextSelector(ReactContext, (v) => v);

        return children(value!);
    };

    const useStore = <Selected = ContextValue, >(selector: (value: ContextValue) => Selected = (v) => v as unknown as Selected): Selected =>
        useContextSelector<ContextValue, Selected>(ReactContext as Context<ContextValue>, selector);
    return {
        useStore,
        Provider,
        Consumer,
        Context: ReactContext,
    };
};


// export const {useStore:useFilterStore, Provider:FilterProvider} = createContext<{filters:string, setFilters:any},{defaultFilters:any}>((value) => {
//     const [filters, setFilters] = useState(value.defaultFilters)
//     const [filters1, setFilters] = useState(value.defaultFilters)
//     const [filters2, setFilters] = useState(value.defaultFilters)
//     const [filters3, setFilters] = useState(value.defaultFilters)
//     const [filters4, setFilters] = useState(value.defaultFilters)
//     // const {} = useQuery({queryFn})
//     return {filters, setFilters}
// })
// const MyComponent = () => {
//     return <FilterProvider value={{defaultFilters:'dsdsds'}}>
//         <CompA/>
//         <CompB/>
//     </FilterProvider>
// }
// const CompA = () => {
//     const filters = useFilterStore(v=>v.filters)
//     return <>{d}</>
// }
// const CompB = () => {
//     const filters = useFilterStore(v=>v.filters1)
//     const filters = useFilterStore(v=>v.setFilters2)
//
//     return <>{d}</>
// }
