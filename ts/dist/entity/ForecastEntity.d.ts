import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { Forecast, ForecastLoadMatch } from '../VeabirdBeachTypes';
declare class ForecastEntity extends VeabirdBeachEntityBase<Forecast> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: ForecastEntity): ForecastEntity;
    load(this: any, reqmatch?: ForecastLoadMatch, ctrl?: Control): Promise<ForecastEntity>;
}
export { ForecastEntity };
