-- Typed models for the VeabirdBeach SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Advisory

---@class AdvisoryLoadMatch
---@field country? string
---@field resort? string

---@class BetterNearby

---@class BetterNearbyLoadMatch
---@field date? string
---@field radius_mile? number
---@field resort string

---@class Condition

---@class ConditionLoadMatch
---@field date? string
---@field resort string

---@class Demand

---@class DemandLoadMatch
---@field day? number
---@field from? string
---@field ical? string
---@field location string
---@field radius_mile? number
---@field rate? number

---@class Flight

---@class FlightLoadMatch
---@field adult? number
---@field children_age? table
---@field depart string
---@field from string
---@field return? string
---@field to string

---@class Forecast

---@class ForecastLoadMatch
---@field day? number
---@field elevation_ft? number
---@field location string
---@field spot? string
---@field unit? string

---@class Hurricane

---@class HurricaneLoadMatch
---@field resort? string

---@class Lodging

---@class LodgingLoadMatch
---@field adult? number
---@field checkin string
---@field checkout string
---@field children_age? table
---@field limit? number
---@field max_price_per_night? number
---@field near string
---@field radius_mile? number
---@field room? number

---@class Match

---@class MatchLoadMatch
---@field ability? table
---@field area? string
---@field budget? string
---@field children_age? table
---@field depart? string
---@field from? string
---@field limit? number
---@field max_drive_hour? number
---@field night? number
---@field pass? string
---@field travel? string

---@class ModelSkill

---@class ModelSkillLoadMatch

---@class Outlook

---@class OutlookLoadMatch
---@field date? string
---@field elevation_ft? number
---@field location string
---@field month? number
---@field spot? string
---@field start? string
---@field unit? string

---@class Plan

---@class PlanLoadMatch
---@field adult? number
---@field children_age? table
---@field depart string
---@field from? string
---@field kind? string
---@field max_price_per_night? number
---@field resort string
---@field return? string

---@class Rank

---@class RankLoadMatch
---@field date? string
---@field from? string
---@field limit? number
---@field near? string
---@field query? string
---@field radius_mile? number

---@class Resort

---@class ResortLoadMatch
---@field limit? number
---@field query? string

---@class Sargassum

---@class SargassumLoadMatch
---@field resort string
---@field week? number

---@class Skill

---@class SkillLoadMatch

---@class Tide

---@class TideLoadMatch
---@field day? number
---@field resort string

local M = {}

return M
