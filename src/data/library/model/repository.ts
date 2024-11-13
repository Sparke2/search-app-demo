import {$api} from "../../../shared/lib/fetch-client";
import {LibraryEndpoints} from "./endpoints";
import {Filter} from "../../filter/model/types";

export namespace LibraryRepository {
    export const getAllLibrary = async () => {
        return $api.get<Filter>(LibraryEndpoints.getAllLibrary()).then(v => v.data)
    };
}
