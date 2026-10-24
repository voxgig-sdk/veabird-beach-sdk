import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { Demand, DemandLoadMatch } from '../VeabirdBeachTypes';
declare class DemandEntity extends VeabirdBeachEntityBase<Demand> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: DemandEntity): DemandEntity;
    load(this: any, reqmatch?: DemandLoadMatch, ctrl?: Control): Promise<DemandEntity>;
}
export { DemandEntity };
