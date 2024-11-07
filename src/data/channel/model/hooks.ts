import {useLocation, useNavigate} from "react-router-dom";

export const useCurrentChannel = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const searParams = new URLSearchParams(location.search)
    const channel = searParams.get('channel')?.split(',').filter(Boolean) || [];
    const add = (newChannelValue: string) => {
        const s = new Set(channel)
        s.add(newChannelValue)
        searParams.set('channel', Array.from(s).join(','));
        navigate({search: searParams.toString()});
    }
    const remove = (newChannelValue: string) => {
        const s = new Set(channel)
        s.delete(newChannelValue)
        searParams.set('channel', Array.from(s).join(','));
        navigate({search: searParams.toString()});
    }
    const set = (newUsgn: string[]) => {
        const params = new URLSearchParams(location.search)
        params.set('channel', newUsgn.join(','))
        navigate({search: params.toString()})

    }

    return {channel, add, remove, set}
}
