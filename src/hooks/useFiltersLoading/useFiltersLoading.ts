import {useAllUGSN} from "../../data/ugsn/model/queries";
import {useCurrentDirectionSearchQuery} from "../useDirectionSearch";
import {useCurrentDisciplinesSearch} from "../useDisciplinesSearch";

export const useFiltersLoading = () => {
    const {isPending: isUgsnLoading} = useAllUGSN()
    const {isPending: isDirectionLoading} = useCurrentDirectionSearchQuery()
    const {isPending: isDisciplinesLoading} = useCurrentDisciplinesSearch();
    return isUgsnLoading || isDirectionLoading || isDisciplinesLoading
}
