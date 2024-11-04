export const {useStore:useFilterStore, Provider:FilterProvider} = createContext<{filters:string, setFilters:
any},{defaultFilters:any}>((value) => {
const [filters, setFilters] = useState(value.defaultFilters)
const [filters1, setFilters] = useState(value.defaultFilters)
const [filters2, setFilters] = useState(value.defaultFilters)
const [filters3, setFilters] = useState(value.defaultFilters)
const [filters4, setFilters] = useState(value.defaultFilters)
// const {} = useQuery({queryFn})
return {filters, setFilters}
})
const MyComponent = () => {
return <FilterProvider value={{defaultFilters:'dsdsds'}}>
<CompA/>
<CompB/>
</FilterProvider>
}
const CompA = () => {
const filters = useFilterStore(v=>v.filters)
return <>{d}</>
}
const CompB = () => {
const filters = useFilterStore(v=>v.filters1)
const filters = useFilterStore(v=>v.setFilters2)

    return <>{d}</>

}
