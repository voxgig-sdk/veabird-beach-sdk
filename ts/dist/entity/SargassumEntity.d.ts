import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { Sargassum, SargassumLoadMatch } from '../VeabirdBeachTypes';
declare class SargassumEntity extends VeabirdBeachEntityBase<Sargassum> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: SargassumEntity): SargassumEntity;
    load(this: any, reqmatch?: SargassumLoadMatch, ctrl?: Control): Promise<SargassumEntity>;
}
export { SargassumEntity };
