import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { Rank, RankLoadMatch } from '../VeabirdBeachTypes';
declare class RankEntity extends VeabirdBeachEntityBase<Rank> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: RankEntity): RankEntity;
    load(this: any, reqmatch?: RankLoadMatch, ctrl?: Control): Promise<RankEntity>;
}
export { RankEntity };
