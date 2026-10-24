import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { Hurricane, HurricaneLoadMatch } from '../VeabirdBeachTypes';
declare class HurricaneEntity extends VeabirdBeachEntityBase<Hurricane> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: HurricaneEntity): HurricaneEntity;
    load(this: any, reqmatch?: HurricaneLoadMatch, ctrl?: Control): Promise<HurricaneEntity>;
}
export { HurricaneEntity };
