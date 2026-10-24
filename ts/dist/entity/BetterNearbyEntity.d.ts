import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { BetterNearby, BetterNearbyLoadMatch } from '../VeabirdBeachTypes';
declare class BetterNearbyEntity extends VeabirdBeachEntityBase<BetterNearby> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: BetterNearbyEntity): BetterNearbyEntity;
    load(this: any, reqmatch?: BetterNearbyLoadMatch, ctrl?: Control): Promise<BetterNearbyEntity>;
}
export { BetterNearbyEntity };
