import {useLocation} from "react-router-dom";
import {UGSNModalRoot} from "../../../../data/ugsn/ui/UGSNModal";
import {useCurrentUGSN} from "../../../../data/ugsn/model/hooks";
import {useCurrentDirection} from "../../../../data/direction/model/hooks";
import {useCurrentDestiplini} from "../../../../data/destiplini/model/hooks";
import React, {memo, ReactNode} from "react";
import {UGSNList} from "../../../../data/ugsn/ui/UGSNList";
import {DestipliniList} from "../../../../data/destiplini/ui/DestipliniList";
import {useCategoriesArray} from "../../../../hooks/useCategoriesArray";
import {DirectionModalRoot} from "../../../../data/direction/ui/DirectionModal";
import {DestipliniModalRoot} from "../../../../data/destiplini/ui/DestipliniModal";
import {DirectionList} from "../../../../data/direction/ui/DirectionList";

// const DirectionModalRoot = lazy(() => import('../../../../data/direction/ui/DirectionModal').then(v => ({default: v.DirectionModalRoot})))
// const DestipliniModalRoot = lazy(() => import('../../../../data/destiplini/ui/DestipliniModal').then(v => ({default: v.DestipliniModalRoot})))
const Container = ({children}: { children: ReactNode | ReactNode[] }) => {
    return (<div className="col-12">
        <>
            {children}
        </>
    </div>)
}
export const GroupModalsChain = memo(() => {
    const currentCategories = useCategoriesArray();

    const location = useLocation()
    const search = new URLSearchParams(location.search)
    const {remove: removeUgsn, ugsn} = useCurrentUGSN()
    const {set: setDirection, direction} = useCurrentDirection()
    const {set: setDestiplini, destiplini} = useCurrentDestiplini()
    console.log({direction})
    // useEffect(() => {
    //     if (!ugsn?.length) {
    //         if (direction)
    //             setDirection([])
    //         if (destiplini)
    //             setDestiplini([])
    //         return;
    //     }
    //     if (!direction.length) {
    //         if (destiplini)
    //             setDestiplini([])
    //         return;
    //     }
    // }, [ugsn, direction, destiplini])
    return (['searchBooks', 'searchPeriodicals'].some(category => currentCategories.includes(category)) || currentCategories.length === 0) ? <>
        <Container>
            <UGSNList/>
            <UGSNModalRoot/>
        </Container>
        {!!ugsn.length && <Container>
            <DirectionList/>
            <DirectionModalRoot/>
        </Container>}
        {(!!ugsn.length && !!direction.length) && <Container>
            <DestipliniList/>
            <DestipliniModalRoot/>
        </Container>}
    </> : null
})
