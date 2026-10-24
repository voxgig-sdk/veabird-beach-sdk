import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { Resort, ResortLoadMatch } from '../VeabirdBeachTypes';
declare class ResortEntity extends VeabirdBeachEntityBase<Resort> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: ResortEntity): ResortEntity;
    load(this: any, reqmatch?: ResortLoadMatch, ctrl?: Control): Promise<ResortEntity>;
}
export { ResortEntity };
