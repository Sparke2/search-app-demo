import {useLocation, useNavigate} from "react-router-dom";

export const useCurrentAudioFiles = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const searParams = new URLSearchParams(location.search)
    const audioFiles = searParams.get('audioFiles')?.split(',').filter(Boolean) || [];
    const add = (newAudioFilesValue: string) => {
        const s = new Set(audioFiles)
        s.add(newAudioFilesValue)
        searParams.set('audioFiles', Array.from(s).join(','));
        navigate({search: searParams.toString()});
    }
    const remove = (newAudioFilesValue: string) => {
        const s = new Set(audioFiles)
        s.delete(newAudioFilesValue)
        searParams.set('audioFiles', Array.from(s).join(','));
        navigate({search: searParams.toString()});
    }
    const set = (newUsgn: string[]) => {
        const params = new URLSearchParams(location.search)
        params.set('audioFiles', newUsgn.join(','))
        navigate({search: params.toString()})

    }

    return {audioFiles, add, remove, set}
}
