import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { Advisory, AdvisoryLoadMatch } from '../VeabirdBeachTypes';
declare class AdvisoryEntity extends VeabirdBeachEntityBase<Advisory> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: AdvisoryEntity): AdvisoryEntity;
    load(this: any, reqmatch?: AdvisoryLoadMatch, ctrl?: Control): Promise<AdvisoryEntity>;
}
export { AdvisoryEntity };
