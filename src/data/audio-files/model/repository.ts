import {$api} from "../../../shared/lib/fetch-client";
import {AudioFilesEndpoints} from "./endpoints";
import {OptionsCheckboxForAudioFiles} from "./mock";

export namespace AudioFilesRepository {
    export const getAllAudioFiles = async () => {
        return $api.get<{
            value: string,
            label: string
        }[]>(AudioFilesEndpoints.getAllAudioFiles()).then(v => v.data).catch(v => OptionsCheckboxForAudioFiles)
    };
}
