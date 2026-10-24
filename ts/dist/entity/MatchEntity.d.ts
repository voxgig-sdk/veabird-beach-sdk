import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { Match, MatchLoadMatch } from '../VeabirdBeachTypes';
declare class MatchEntity extends VeabirdBeachEntityBase<Match> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: MatchEntity): MatchEntity;
    load(this: any, reqmatch?: MatchLoadMatch, ctrl?: Control): Promise<MatchEntity>;
}
export { MatchEntity };
