import { VeabirdBeachEntityBase } from '../VeabirdBeachEntityBase';
import type { VeabirdBeachSDK } from '../VeabirdBeachSDK';
import type { Control } from '../types';
import type { Flight, FlightLoadMatch } from '../VeabirdBeachTypes';
declare class FlightEntity extends VeabirdBeachEntityBase<Flight> {
    constructor(client: VeabirdBeachSDK, entopts: any);
    make(this: FlightEntity): FlightEntity;
    load(this: any, reqmatch?: FlightLoadMatch, ctrl?: Control): Promise<FlightEntity>;
}
export { FlightEntity };
