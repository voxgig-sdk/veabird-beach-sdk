// Typed models for the VeabirdBeach SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/veabird-beach-sdk/go/core"
)

// Advisory is the typed data model for the advisory entity.
type Advisory struct {
}

// AdvisoryLoadMatch is the typed request payload for Advisory.LoadTyped.
type AdvisoryLoadMatch struct {
	Country *string `json:"country,omitempty"`
	Resort *string `json:"resort,omitempty"`
}

// BetterNearby is the typed data model for the better_nearby entity.
type BetterNearby struct {
}

// BetterNearbyLoadMatch is the typed request payload for BetterNearby.LoadTyped.
type BetterNearbyLoadMatch struct {
	Date *string `json:"date,omitempty"`
	RadiusMile *float64 `json:"radius_mile,omitempty"`
	Resort string `json:"resort"`
}

// Condition is the typed data model for the condition entity.
type Condition struct {
}

// ConditionLoadMatch is the typed request payload for Condition.LoadTyped.
type ConditionLoadMatch struct {
	Date *string `json:"date,omitempty"`
	Resort string `json:"resort"`
}

// Demand is the typed data model for the demand entity.
type Demand struct {
}

// DemandLoadMatch is the typed request payload for Demand.LoadTyped.
type DemandLoadMatch struct {
	Day *int `json:"day,omitempty"`
	From *string `json:"from,omitempty"`
	Ical *string `json:"ical,omitempty"`
	Location string `json:"location"`
	RadiusMile *float64 `json:"radius_mile,omitempty"`
	Rate *float64 `json:"rate,omitempty"`
}

// Flight is the typed data model for the flight entity.
type Flight struct {
}

// FlightLoadMatch is the typed request payload for Flight.LoadTyped.
type FlightLoadMatch struct {
	Adult *int `json:"adult,omitempty"`
	ChildrenAge *[]any `json:"children_age,omitempty"`
	Depart string `json:"depart"`
	From string `json:"from"`
	Return *string `json:"return,omitempty"`
	To string `json:"to"`
}

// Forecast is the typed data model for the forecast entity.
type Forecast struct {
}

// ForecastLoadMatch is the typed request payload for Forecast.LoadTyped.
type ForecastLoadMatch struct {
	Day *int `json:"day,omitempty"`
	ElevationFt *float64 `json:"elevation_ft,omitempty"`
	Location string `json:"location"`
	Spot *string `json:"spot,omitempty"`
	Unit *string `json:"unit,omitempty"`
}

// Hurricane is the typed data model for the hurricane entity.
type Hurricane struct {
}

// HurricaneLoadMatch is the typed request payload for Hurricane.LoadTyped.
type HurricaneLoadMatch struct {
	Resort *string `json:"resort,omitempty"`
}

// Lodging is the typed data model for the lodging entity.
type Lodging struct {
}

// LodgingLoadMatch is the typed request payload for Lodging.LoadTyped.
type LodgingLoadMatch struct {
	Adult *int `json:"adult,omitempty"`
	Checkin string `json:"checkin"`
	Checkout string `json:"checkout"`
	ChildrenAge *[]any `json:"children_age,omitempty"`
	Limit *int `json:"limit,omitempty"`
	MaxPricePerNight *float64 `json:"max_price_per_night,omitempty"`
	Near string `json:"near"`
	RadiusMile *float64 `json:"radius_mile,omitempty"`
	Room *int `json:"room,omitempty"`
}

// Match is the typed data model for the match entity.
type Match struct {
}

// MatchLoadMatch is the typed request payload for Match.LoadTyped.
type MatchLoadMatch struct {
	Ability *[]any `json:"ability,omitempty"`
	Area *string `json:"area,omitempty"`
	Budget *string `json:"budget,omitempty"`
	ChildrenAge *[]any `json:"children_age,omitempty"`
	Depart *string `json:"depart,omitempty"`
	From *string `json:"from,omitempty"`
	Limit *int `json:"limit,omitempty"`
	MaxDriveHour *float64 `json:"max_drive_hour,omitempty"`
	Night *int `json:"night,omitempty"`
	Pass *string `json:"pass,omitempty"`
	Travel *string `json:"travel,omitempty"`
}

// ModelSkill is the typed data model for the model_skill entity.
type ModelSkill struct {
}

// ModelSkillLoadMatch is the typed request payload for ModelSkill.LoadTyped.
type ModelSkillLoadMatch struct {
}

// Outlook is the typed data model for the outlook entity.
type Outlook struct {
}

// OutlookLoadMatch is the typed request payload for Outlook.LoadTyped.
type OutlookLoadMatch struct {
	Date *string `json:"date,omitempty"`
	ElevationFt *float64 `json:"elevation_ft,omitempty"`
	Location string `json:"location"`
	Month *int `json:"month,omitempty"`
	Spot *string `json:"spot,omitempty"`
	Start *string `json:"start,omitempty"`
	Unit *string `json:"unit,omitempty"`
}

// Plan is the typed data model for the plan entity.
type Plan struct {
}

// PlanLoadMatch is the typed request payload for Plan.LoadTyped.
type PlanLoadMatch struct {
	Adult *int `json:"adult,omitempty"`
	ChildrenAge *[]any `json:"children_age,omitempty"`
	Depart string `json:"depart"`
	From *string `json:"from,omitempty"`
	Kind *string `json:"kind,omitempty"`
	MaxPricePerNight *float64 `json:"max_price_per_night,omitempty"`
	Resort string `json:"resort"`
	Return *string `json:"return,omitempty"`
}

// Rank is the typed data model for the rank entity.
type Rank struct {
}

// RankLoadMatch is the typed request payload for Rank.LoadTyped.
type RankLoadMatch struct {
	Date *string `json:"date,omitempty"`
	From *string `json:"from,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Near *string `json:"near,omitempty"`
	Query *string `json:"query,omitempty"`
	RadiusMile *float64 `json:"radius_mile,omitempty"`
}

// Resort is the typed data model for the resort entity.
type Resort struct {
}

// ResortLoadMatch is the typed request payload for Resort.LoadTyped.
type ResortLoadMatch struct {
	Limit *int `json:"limit,omitempty"`
	Query *string `json:"query,omitempty"`
}

// Sargassum is the typed data model for the sargassum entity.
type Sargassum struct {
}

// SargassumLoadMatch is the typed request payload for Sargassum.LoadTyped.
type SargassumLoadMatch struct {
	Resort string `json:"resort"`
	Week *int `json:"week,omitempty"`
}

// Skill is the typed data model for the skill entity.
type Skill struct {
}

// SkillLoadMatch is the typed request payload for Skill.LoadTyped.
type SkillLoadMatch struct {
}

// Tide is the typed data model for the tide entity.
type Tide struct {
}

// TideLoadMatch is the typed request payload for Tide.LoadTyped.
type TideLoadMatch struct {
	Day *int `json:"day,omitempty"`
	Resort string `json:"resort"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
