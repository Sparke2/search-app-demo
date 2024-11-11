import {PeriodicalRepository} from "./repository";

export namespace PeriodicalKeys {
    export namespace getAll {
        export const UNIQUE_PART = 'periodical-all'
        export const PeriodicalAll = (body: PeriodicalRepository.periodicalBody, query:{rows:number,start:number}) => [UNIQUE_PART, {body, query}]
    }
}
