import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { Condition, ConditionLoadMatch } from '../VeabirdBeachTypes';
declare class ConditionEntity extends VeabirdBeachEntityBase<Condition> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: ConditionEntity): ConditionEntity;
    load(this: any, reqmatch?: ConditionLoadMatch, ctrl?: Control): Promise<ConditionEntity>;
}
export { ConditionEntity };
