import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { ModelSkill, ModelSkillLoadMatch } from '../VeabirdBeachTypes';
declare class ModelSkillEntity extends VeabirdBeachEntityBase<ModelSkill> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: ModelSkillEntity): ModelSkillEntity;
    load(this: any, reqmatch?: ModelSkillLoadMatch, ctrl?: Control): Promise<ModelSkillEntity>;
}
export { ModelSkillEntity };
