import {useCategoriesArray} from "../hooks/useCategoriesArray";
import {ReactNode, useMemo} from "react";

export const CurrentCategoriesExclusive = ({categories, children}: {
    categories: string[],
    children: ReactNode | ReactNode[]
}) => {
    const currentCategories = useCategoriesArray()
    const isValid = (categories.some(category => currentCategories.includes(category)) || currentCategories.length === 0)
    return useMemo(() => !isValid ? null : <>{children}</>, [isValid])

}
