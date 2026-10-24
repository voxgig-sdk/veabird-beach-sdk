import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { Tide, TideLoadMatch } from '../VeabirdBeachTypes';
declare class TideEntity extends VeabirdBeachEntityBase<Tide> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: TideEntity): TideEntity;
    load(this: any, reqmatch?: TideLoadMatch, ctrl?: Control): Promise<TideEntity>;
}
export { TideEntity };
