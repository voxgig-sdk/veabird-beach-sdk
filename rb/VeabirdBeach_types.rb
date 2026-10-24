# frozen_string_literal: true

# Typed models for the VeabirdBeach SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Advisory entity data model.
class Advisory
end

# Request payload for Advisory#load.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] resort
#   @return [String, nil]
AdvisoryLoadMatch = Struct.new(
  :country,
  :resort,
  keyword_init: true
)

# BetterNearby entity data model.
class BetterNearby
end

# Request payload for BetterNearby#load.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] radius_mile
#   @return [Float, nil]
#
# @!attribute [rw] resort
#   @return [String]
BetterNearbyLoadMatch = Struct.new(
  :date,
  :radius_mile,
  :resort,
  keyword_init: true
)

# Condition entity data model.
class Condition
end

# Request payload for Condition#load.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] resort
#   @return [String]
ConditionLoadMatch = Struct.new(
  :date,
  :resort,
  keyword_init: true
)

# Demand entity data model.
class Demand
end

# Request payload for Demand#load.
#
# @!attribute [rw] day
#   @return [Integer, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] ical
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [String]
#
# @!attribute [rw] radius_mile
#   @return [Float, nil]
#
# @!attribute [rw] rate
#   @return [Float, nil]
DemandLoadMatch = Struct.new(
  :day,
  :from,
  :ical,
  :location,
  :radius_mile,
  :rate,
  keyword_init: true
)

# Flight entity data model.
class Flight
end

# Request payload for Flight#load.
#
# @!attribute [rw] adult
#   @return [Integer, nil]
#
# @!attribute [rw] children_age
#   @return [Array, nil]
#
# @!attribute [rw] depart
#   @return [String]
#
# @!attribute [rw] from
#   @return [String]
#
# @!attribute [rw] return
#   @return [String, nil]
#
# @!attribute [rw] to
#   @return [String]
FlightLoadMatch = Struct.new(
  :adult,
  :children_age,
  :depart,
  :from,
  :return,
  :to,
  keyword_init: true
)

# Forecast entity data model.
class Forecast
end

# Request payload for Forecast#load.
#
# @!attribute [rw] day
#   @return [Integer, nil]
#
# @!attribute [rw] elevation_ft
#   @return [Float, nil]
#
# @!attribute [rw] location
#   @return [String]
#
# @!attribute [rw] spot
#   @return [String, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
ForecastLoadMatch = Struct.new(
  :day,
  :elevation_ft,
  :location,
  :spot,
  :unit,
  keyword_init: true
)

# Hurricane entity data model.
class Hurricane
end

# Request payload for Hurricane#load.
#
# @!attribute [rw] resort
#   @return [String, nil]
HurricaneLoadMatch = Struct.new(
  :resort,
  keyword_init: true
)

# Lodging entity data model.
class Lodging
end

# Request payload for Lodging#load.
#
# @!attribute [rw] adult
#   @return [Integer, nil]
#
# @!attribute [rw] checkin
#   @return [String]
#
# @!attribute [rw] checkout
#   @return [String]
#
# @!attribute [rw] children_age
#   @return [Array, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] max_price_per_night
#   @return [Float, nil]
#
# @!attribute [rw] near
#   @return [String]
#
# @!attribute [rw] radius_mile
#   @return [Float, nil]
#
# @!attribute [rw] room
#   @return [Integer, nil]
LodgingLoadMatch = Struct.new(
  :adult,
  :checkin,
  :checkout,
  :children_age,
  :limit,
  :max_price_per_night,
  :near,
  :radius_mile,
  :room,
  keyword_init: true
)

# Match entity data model.
class Match
end

# Request payload for Match#load.
#
# @!attribute [rw] ability
#   @return [Array, nil]
#
# @!attribute [rw] area
#   @return [String, nil]
#
# @!attribute [rw] budget
#   @return [String, nil]
#
# @!attribute [rw] children_age
#   @return [Array, nil]
#
# @!attribute [rw] depart
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] max_drive_hour
#   @return [Float, nil]
#
# @!attribute [rw] night
#   @return [Integer, nil]
#
# @!attribute [rw] pass
#   @return [String, nil]
#
# @!attribute [rw] travel
#   @return [String, nil]
MatchLoadMatch = Struct.new(
  :ability,
  :area,
  :budget,
  :children_age,
  :depart,
  :from,
  :limit,
  :max_drive_hour,
  :night,
  :pass,
  :travel,
  keyword_init: true
)

# ModelSkill entity data model.
class ModelSkill
end

# Request payload for ModelSkill#load.
class ModelSkillLoadMatch
end

# Outlook entity data model.
class Outlook
end

# Request payload for Outlook#load.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] elevation_ft
#   @return [Float, nil]
#
# @!attribute [rw] location
#   @return [String]
#
# @!attribute [rw] month
#   @return [Integer, nil]
#
# @!attribute [rw] spot
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
OutlookLoadMatch = Struct.new(
  :date,
  :elevation_ft,
  :location,
  :month,
  :spot,
  :start,
  :unit,
  keyword_init: true
)

# Plan entity data model.
class Plan
end

# Request payload for Plan#load.
#
# @!attribute [rw] adult
#   @return [Integer, nil]
#
# @!attribute [rw] children_age
#   @return [Array, nil]
#
# @!attribute [rw] depart
#   @return [String]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] max_price_per_night
#   @return [Float, nil]
#
# @!attribute [rw] resort
#   @return [String]
#
# @!attribute [rw] return
#   @return [String, nil]
PlanLoadMatch = Struct.new(
  :adult,
  :children_age,
  :depart,
  :from,
  :kind,
  :max_price_per_night,
  :resort,
  :return,
  keyword_init: true
)

# Rank entity data model.
class Rank
end

# Request payload for Rank#load.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] near
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] radius_mile
#   @return [Float, nil]
RankLoadMatch = Struct.new(
  :date,
  :from,
  :limit,
  :near,
  :query,
  :radius_mile,
  keyword_init: true
)

# Resort entity data model.
class Resort
end

# Request payload for Resort#load.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
ResortLoadMatch = Struct.new(
  :limit,
  :query,
  keyword_init: true
)

# Sargassum entity data model.
class Sargassum
end

# Request payload for Sargassum#load.
#
# @!attribute [rw] resort
#   @return [String]
#
# @!attribute [rw] week
#   @return [Integer, nil]
SargassumLoadMatch = Struct.new(
  :resort,
  :week,
  keyword_init: true
)

# Skill entity data model.
class Skill
end

# Request payload for Skill#load.
class SkillLoadMatch
end

# Tide entity data model.
class Tide
end

# Request payload for Tide#load.
#
# @!attribute [rw] day
#   @return [Integer, nil]
#
# @!attribute [rw] resort
#   @return [String]
TideLoadMatch = Struct.new(
  :day,
  :resort,
  keyword_init: true
)

