package voxgigveabirdbeachsdk

import (
	"github.com/voxgig-sdk/veabird-beach-sdk/go/core"
	"github.com/voxgig-sdk/veabird-beach-sdk/go/entity"
	"github.com/voxgig-sdk/veabird-beach-sdk/go/feature"
	_ "github.com/voxgig-sdk/veabird-beach-sdk/go/utility"
)

// Type aliases preserve external API.
type VeabirdBeachSDK = core.VeabirdBeachSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type VeabirdBeachEntity = core.VeabirdBeachEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type VeabirdBeachError = core.VeabirdBeachError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewAdvisoryEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewAdvisoryEntity(client, entopts)
	}
	core.NewBetterNearbyEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewBetterNearbyEntity(client, entopts)
	}
	core.NewConditionEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewConditionEntity(client, entopts)
	}
	core.NewDemandEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewDemandEntity(client, entopts)
	}
	core.NewFlightEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewFlightEntity(client, entopts)
	}
	core.NewForecastEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewForecastEntity(client, entopts)
	}
	core.NewHurricaneEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewHurricaneEntity(client, entopts)
	}
	core.NewLodgingEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewLodgingEntity(client, entopts)
	}
	core.NewMatchEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewMatchEntity(client, entopts)
	}
	core.NewModelSkillEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewModelSkillEntity(client, entopts)
	}
	core.NewOutlookEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewOutlookEntity(client, entopts)
	}
	core.NewPlanEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewPlanEntity(client, entopts)
	}
	core.NewRankEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewRankEntity(client, entopts)
	}
	core.NewResortEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewResortEntity(client, entopts)
	}
	core.NewSargassumEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewSargassumEntity(client, entopts)
	}
	core.NewSkillEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewSkillEntity(client, entopts)
	}
	core.NewTideEntityFunc = func(client *core.VeabirdBeachSDK, entopts map[string]any) core.VeabirdBeachEntity {
		return entity.NewTideEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewVeabirdBeachSDK = core.NewVeabirdBeachSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewVeabirdBeachSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *VeabirdBeachSDK  { return NewVeabirdBeachSDK(nil) }
func Test() *VeabirdBeachSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
