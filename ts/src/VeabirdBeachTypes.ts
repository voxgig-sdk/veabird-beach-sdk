// Typed models for the VeabirdBeach SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Advisory {
}

export interface AdvisoryLoadMatch {
  country?: string
  resort?: string
}

export interface BetterNearby {
}

export interface BetterNearbyLoadMatch {
  date?: string
  radius_mile?: number
  resort: string
}

export interface Condition {
}

export interface ConditionLoadMatch {
  date?: string
  resort: string
}

export interface Demand {
}

export interface DemandLoadMatch {
  day?: number
  from?: string
  ical?: string
  location: string
  radius_mile?: number
  rate?: number
}

export interface Flight {
}

export interface FlightLoadMatch {
  adult?: number
  children_age?: any[]
  depart: string
  from: string
  return?: string
  to: string
}

export interface Forecast {
}

export interface ForecastLoadMatch {
  day?: number
  elevation_ft?: number
  location: string
  spot?: string
  unit?: string
}

export interface Hurricane {
}

export interface HurricaneLoadMatch {
  resort?: string
}

export interface Lodging {
}

export interface LodgingLoadMatch {
  adult?: number
  checkin: string
  checkout: string
  children_age?: any[]
  limit?: number
  max_price_per_night?: number
  near: string
  radius_mile?: number
  room?: number
}

export interface Match {
}

export interface MatchLoadMatch {
  ability?: any[]
  area?: string
  budget?: string
  children_age?: any[]
  depart?: string
  from?: string
  limit?: number
  max_drive_hour?: number
  night?: number
  pass?: string
  travel?: string
}

export interface ModelSkill {
}

export interface ModelSkillLoadMatch {
}

export interface Outlook {
}

export interface OutlookLoadMatch {
  date?: string
  elevation_ft?: number
  location: string
  month?: number
  spot?: string
  start?: string
  unit?: string
}

export interface Plan {
}

export interface PlanLoadMatch {
  adult?: number
  children_age?: any[]
  depart: string
  from?: string
  kind?: string
  max_price_per_night?: number
  resort: string
  return?: string
}

export interface Rank {
}

export interface RankLoadMatch {
  date?: string
  from?: string
  limit?: number
  near?: string
  query?: string
  radius_mile?: number
}

export interface Resort {
}

export interface ResortLoadMatch {
  limit?: number
  query?: string
}

export interface Sargassum {
}

export interface SargassumLoadMatch {
  resort: string
  week?: number
}

export interface Skill {
}

export interface SkillLoadMatch {
}

export interface Tide {
}

export interface TideLoadMatch {
  day?: number
  resort: string
}

