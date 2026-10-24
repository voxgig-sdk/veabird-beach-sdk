<?php
declare(strict_types=1);

// Typed models for the VeabirdBeach SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Advisory entity data model. */
class Advisory
{
}

/** Request payload for Advisory#load. */
class AdvisoryLoadMatch
{
    public ?string $country = null;
    public ?string $resort = null;
}

/** BetterNearby entity data model. */
class BetterNearby
{
}

/** Request payload for BetterNearby#load. */
class BetterNearbyLoadMatch
{
    public ?string $date = null;
    public ?float $radius_mile = null;
    public string $resort;
}

/** Condition entity data model. */
class Condition
{
}

/** Request payload for Condition#load. */
class ConditionLoadMatch
{
    public ?string $date = null;
    public string $resort;
}

/** Demand entity data model. */
class Demand
{
}

/** Request payload for Demand#load. */
class DemandLoadMatch
{
    public ?int $day = null;
    public ?string $from = null;
    public ?string $ical = null;
    public string $location;
    public ?float $radius_mile = null;
    public ?float $rate = null;
}

/** Flight entity data model. */
class Flight
{
}

/** Request payload for Flight#load. */
class FlightLoadMatch
{
    public ?int $adult = null;
    public ?array $children_age = null;
    public string $depart;
    public string $from;
    public ?string $return = null;
    public string $to;
}

/** Forecast entity data model. */
class Forecast
{
}

/** Request payload for Forecast#load. */
class ForecastLoadMatch
{
    public ?int $day = null;
    public ?float $elevation_ft = null;
    public string $location;
    public ?string $spot = null;
    public ?string $unit = null;
}

/** Hurricane entity data model. */
class Hurricane
{
}

/** Request payload for Hurricane#load. */
class HurricaneLoadMatch
{
    public ?string $resort = null;
}

/** Lodging entity data model. */
class Lodging
{
}

/** Request payload for Lodging#load. */
class LodgingLoadMatch
{
    public ?int $adult = null;
    public string $checkin;
    public string $checkout;
    public ?array $children_age = null;
    public ?int $limit = null;
    public ?float $max_price_per_night = null;
    public string $near;
    public ?float $radius_mile = null;
    public ?int $room = null;
}

/** Match entity data model. */
class MatchType
{
}

/** Request payload for Match#load. */
class MatchLoadMatch
{
    public ?array $ability = null;
    public ?string $area = null;
    public ?string $budget = null;
    public ?array $children_age = null;
    public ?string $depart = null;
    public ?string $from = null;
    public ?int $limit = null;
    public ?float $max_drive_hour = null;
    public ?int $night = null;
    public ?string $pass = null;
    public ?string $travel = null;
}

/** ModelSkill entity data model. */
class ModelSkill
{
}

/** Request payload for ModelSkill#load. */
class ModelSkillLoadMatch
{
}

/** Outlook entity data model. */
class Outlook
{
}

/** Request payload for Outlook#load. */
class OutlookLoadMatch
{
    public ?string $date = null;
    public ?float $elevation_ft = null;
    public string $location;
    public ?int $month = null;
    public ?string $spot = null;
    public ?string $start = null;
    public ?string $unit = null;
}

/** Plan entity data model. */
class Plan
{
}

/** Request payload for Plan#load. */
class PlanLoadMatch
{
    public ?int $adult = null;
    public ?array $children_age = null;
    public string $depart;
    public ?string $from = null;
    public ?string $kind = null;
    public ?float $max_price_per_night = null;
    public string $resort;
    public ?string $return = null;
}

/** Rank entity data model. */
class Rank
{
}

/** Request payload for Rank#load. */
class RankLoadMatch
{
    public ?string $date = null;
    public ?string $from = null;
    public ?int $limit = null;
    public ?string $near = null;
    public ?string $query = null;
    public ?float $radius_mile = null;
}

/** Resort entity data model. */
class Resort
{
}

/** Request payload for Resort#load. */
class ResortLoadMatch
{
    public ?int $limit = null;
    public ?string $query = null;
}

/** Sargassum entity data model. */
class Sargassum
{
}

/** Request payload for Sargassum#load. */
class SargassumLoadMatch
{
    public string $resort;
    public ?int $week = null;
}

/** Skill entity data model. */
class Skill
{
}

/** Request payload for Skill#load. */
class SkillLoadMatch
{
}

/** Tide entity data model. */
class Tide
{
}

/** Request payload for Tide#load. */
class TideLoadMatch
{
    public ?int $day = null;
    public string $resort;
}

