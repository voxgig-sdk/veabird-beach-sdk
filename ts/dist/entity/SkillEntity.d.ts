import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { Skill, SkillLoadMatch } from '../VeabirdBeachTypes';
declare class SkillEntity extends VeabirdBeachEntityBase<Skill> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: SkillEntity): SkillEntity;
    load(this: any, reqmatch?: SkillLoadMatch, ctrl?: Control): Promise<SkillEntity>;
}
export { SkillEntity };
