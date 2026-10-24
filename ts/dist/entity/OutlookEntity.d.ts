import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { Outlook, OutlookLoadMatch } from '../VeabirdBeachTypes';
declare class OutlookEntity extends VeabirdBeachEntityBase<Outlook> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: OutlookEntity): OutlookEntity;
    load(this: any, reqmatch?: OutlookLoadMatch, ctrl?: Control): Promise<OutlookEntity>;
}
export { OutlookEntity };
