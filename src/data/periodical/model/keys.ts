import {PeriodicalRepository} from "./repository";

export namespace PeriodicalKeys {
    export namespace getAll {
        export const UNIQUE_PART = 'periodical-all'
        export const PeriodicalAll = (body: PeriodicalRepository.periodicalBody, query:{rows:number,start:number}) => [UNIQUE_PART, {body, query}]
    }

    export namespace getExel {
        export const UNIQUE_PART = 'periodical-exel'
        export const PeriodicalExel = (body: PeriodicalRepository.periodicalBody) => [UNIQUE_PART, {body}]
    }
}
