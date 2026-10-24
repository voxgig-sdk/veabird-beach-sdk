import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { Lodging, LodgingLoadMatch } from '../VeabirdBeachTypes';
declare class LodgingEntity extends VeabirdBeachEntityBase<Lodging> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: LodgingEntity): LodgingEntity;
    load(this: any, reqmatch?: LodgingLoadMatch, ctrl?: Control): Promise<LodgingEntity>;
}
export { LodgingEntity };
