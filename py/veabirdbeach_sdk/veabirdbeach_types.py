# Typed models for the VeabirdBeach SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Advisory(TypedDict):
    pass


class AdvisoryLoadMatch(TypedDict, total=False):
    country: str
    resort: str


class BetterNearby(TypedDict):
    pass


class BetterNearbyLoadMatchRequired(TypedDict):
    resort: str


class BetterNearbyLoadMatch(BetterNearbyLoadMatchRequired, total=False):
    date: str
    radius_mile: float


class Condition(TypedDict):
    pass


class ConditionLoadMatchRequired(TypedDict):
    resort: str


class ConditionLoadMatch(ConditionLoadMatchRequired, total=False):
    date: str


class Demand(TypedDict):
    pass


DemandLoadMatchRequired = TypedDict('DemandLoadMatchRequired', {
    "location": str,
})

DemandLoadMatchOptional = TypedDict('DemandLoadMatchOptional', {
    "day": int,
    "from": str,
    "ical": str,
    "radius_mile": float,
    "rate": float,
}, total=False)


class DemandLoadMatch(DemandLoadMatchRequired, DemandLoadMatchOptional):
    pass


class Flight(TypedDict):
    pass


FlightLoadMatchRequired = TypedDict('FlightLoadMatchRequired', {
    "depart": str,
    "from": str,
    "to": str,
})

FlightLoadMatchOptional = TypedDict('FlightLoadMatchOptional', {
    "adult": int,
    "children_age": list,
    "return": str,
}, total=False)


class FlightLoadMatch(FlightLoadMatchRequired, FlightLoadMatchOptional):
    pass


class Forecast(TypedDict):
    pass


class ForecastLoadMatchRequired(TypedDict):
    location: str


class ForecastLoadMatch(ForecastLoadMatchRequired, total=False):
    day: int
    elevation_ft: float
    spot: str
    unit: str


class Hurricane(TypedDict):
    pass


class HurricaneLoadMatch(TypedDict, total=False):
    resort: str


class Lodging(TypedDict):
    pass


class LodgingLoadMatchRequired(TypedDict):
    checkin: str
    checkout: str
    near: str


class LodgingLoadMatch(LodgingLoadMatchRequired, total=False):
    adult: int
    children_age: list
    limit: int
    max_price_per_night: float
    radius_mile: float
    room: int


class Match(TypedDict):
    pass


MatchLoadMatch = TypedDict('MatchLoadMatch', {
    "ability": list,
    "area": str,
    "budget": str,
    "children_age": list,
    "depart": str,
    "from": str,
    "limit": int,
    "max_drive_hour": float,
    "night": int,
    "pass": str,
    "travel": str,
}, total=False)


class ModelSkill(TypedDict):
    pass


class ModelSkillLoadMatch(TypedDict):
    pass


class Outlook(TypedDict):
    pass


class OutlookLoadMatchRequired(TypedDict):
    location: str


class OutlookLoadMatch(OutlookLoadMatchRequired, total=False):
    date: str
    elevation_ft: float
    month: int
    spot: str
    start: str
    unit: str


class Plan(TypedDict):
    pass


PlanLoadMatchRequired = TypedDict('PlanLoadMatchRequired', {
    "depart": str,
    "resort": str,
})

PlanLoadMatchOptional = TypedDict('PlanLoadMatchOptional', {
    "adult": int,
    "children_age": list,
    "from": str,
    "kind": str,
    "max_price_per_night": float,
    "return": str,
}, total=False)


class PlanLoadMatch(PlanLoadMatchRequired, PlanLoadMatchOptional):
    pass


class Rank(TypedDict):
    pass


RankLoadMatch = TypedDict('RankLoadMatch', {
    "date": str,
    "from": str,
    "limit": int,
    "near": str,
    "query": str,
    "radius_mile": float,
}, total=False)


class Resort(TypedDict):
    pass


class ResortLoadMatch(TypedDict, total=False):
    limit: int
    query: str


class Sargassum(TypedDict):
    pass


class SargassumLoadMatchRequired(TypedDict):
    resort: str


class SargassumLoadMatch(SargassumLoadMatchRequired, total=False):
    week: int


class Skill(TypedDict):
    pass


class SkillLoadMatch(TypedDict):
    pass


class Tide(TypedDict):
    pass


class TideLoadMatchRequired(TypedDict):
    resort: str


class TideLoadMatch(TideLoadMatchRequired, total=False):
    day: int
