import {$api} from "../../../shared/lib/fetch-client";
import {LibraryEndpoints} from "./endpoints";
import {OptionsCheckboxForLibrary} from "./mock";

export namespace LibraryRepository {
    export const getAllLibrary = async () => {
        return $api.get<{
            value: string,
            label: string
        }[]>(LibraryEndpoints.getAllLibrary()).then(v => v.data).catch(v => OptionsCheckboxForLibrary)
    };
}
