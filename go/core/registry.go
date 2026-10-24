package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAdvisoryEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewBetterNearbyEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewConditionEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewDemandEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewFlightEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewForecastEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewHurricaneEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewLodgingEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewMatchEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewModelSkillEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewOutlookEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewPlanEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewRankEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewResortEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewSargassumEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewSkillEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

var NewTideEntityFunc func(client *VeabirdBeachSDK, entopts map[string]any) VeabirdBeachEntity

