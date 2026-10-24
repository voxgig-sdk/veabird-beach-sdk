import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { Plan, PlanLoadMatch } from '../VeabirdBeachTypes';
declare class PlanEntity extends VeabirdBeachEntityBase<Plan> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: PlanEntity): PlanEntity;
    load(this: any, reqmatch?: PlanLoadMatch, ctrl?: Control): Promise<PlanEntity>;
}
export { PlanEntity };
