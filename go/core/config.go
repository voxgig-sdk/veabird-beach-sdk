package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "VeabirdBeach",
			"slug": "veabird-beach",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://veabird.com/api/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"advisory": map[string]any{},
				"better_nearby": map[string]any{},
				"condition": map[string]any{},
				"demand": map[string]any{},
				"flight": map[string]any{},
				"forecast": map[string]any{},
				"hurricane": map[string]any{},
				"lodging": map[string]any{},
				"match": map[string]any{},
				"model_skill": map[string]any{},
				"outlook": map[string]any{},
				"plan": map[string]any{},
				"rank": map[string]any{},
				"resort": map[string]any{},
				"sargassum": map[string]any{},
				"skill": map[string]any{},
				"tide": map[string]any{},
			},
		},
		"entity": map[string]any{
			"advisory": map[string]any{
				"fields": []any{},
				"name": "advisory",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/beach/advisory",
								"segments": []any{
									map[string]any{
										"lit": "beach",
									},
									map[string]any{
										"lit": "advisory",
									},
								},
								"parts": []any{
									"beach",
									"advisory",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "resort",
											"orig": "resort",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"better_nearby": map[string]any{
				"fields": []any{},
				"name": "better_nearby",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/beach/better-nearby",
								"segments": []any{
									map[string]any{
										"lit": "beach",
									},
									map[string]any{
										"lit": "better-nearby",
									},
								},
								"parts": []any{
									"beach",
									"better-nearby",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "radius_mile",
											"orig": "radiusMiles",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "resort",
											"orig": "resort",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "Tulum",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"resort",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"condition": map[string]any{
				"fields": []any{},
				"name": "condition",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/beach/conditions",
								"segments": []any{
									map[string]any{
										"lit": "beach",
									},
									map[string]any{
										"lit": "conditions",
									},
								},
								"parts": []any{
									"beach",
									"conditions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "resort",
											"orig": "resort",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "Tulum",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"resort",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ski/conditions",
								"segments": []any{
									map[string]any{
										"lit": "ski",
									},
									map[string]any{
										"lit": "conditions",
									},
								},
								"parts": []any{
									"ski",
									"conditions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "resort",
											"orig": "resort",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "Breckenridge",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"resort",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"demand": map[string]any{
				"fields": []any{},
				"name": "demand",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/host/demand",
								"segments": []any{
									map[string]any{
										"lit": "host",
									},
									map[string]any{
										"lit": "demand",
									},
								},
								"parts": []any{
									"host",
									"demand",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "day",
											"orig": "days",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "ical",
											"orig": "ical",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "location",
											"orig": "location",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "Destin, FL",
										},
										map[string]any{
											"name": "radius_mile",
											"orig": "radiusMiles",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "rate",
											"orig": "rate",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "rate",
											"orig": "rates",
											"type": "`$ARRAY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"location",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"flight": map[string]any{
				"fields": []any{},
				"name": "flight",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/trip/flights",
								"segments": []any{
									map[string]any{
										"lit": "trip",
									},
									map[string]any{
										"lit": "flights",
									},
								},
								"parts": []any{
									"trip",
									"flights",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "adult",
											"orig": "adults",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "children_age",
											"orig": "childrenAges",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "depart",
											"orig": "depart",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "2027-01-15",
										},
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "DFW",
										},
										map[string]any{
											"name": "return",
											"orig": "return",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "Breckenridge",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"depart",
										"from",
										"to",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"forecast": map[string]any{
				"fields": []any{},
				"name": "forecast",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/weather/forecast",
								"segments": []any{
									map[string]any{
										"lit": "weather",
									},
									map[string]any{
										"lit": "forecast",
									},
								},
								"parts": []any{
									"weather",
									"forecast",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "day",
											"orig": "days",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "elevation_ft",
											"orig": "elevationFt",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "location",
											"orig": "location",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "Chamonix",
										},
										map[string]any{
											"name": "spot",
											"orig": "spot",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "unit",
											"orig": "units",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"location",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"hurricane": map[string]any{
				"fields": []any{},
				"name": "hurricane",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/beach/hurricanes",
								"segments": []any{
									map[string]any{
										"lit": "beach",
									},
									map[string]any{
										"lit": "hurricanes",
									},
								},
								"parts": []any{
									"beach",
									"hurricanes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "resort",
											"orig": "resort",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"lodging": map[string]any{
				"fields": []any{},
				"name": "lodging",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/trip/lodging",
								"segments": []any{
									map[string]any{
										"lit": "trip",
									},
									map[string]any{
										"lit": "lodging",
									},
								},
								"parts": []any{
									"trip",
									"lodging",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "adult",
											"orig": "adults",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "checkin",
											"orig": "checkin",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "2027-01-15",
										},
										map[string]any{
											"name": "checkout",
											"orig": "checkout",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "2027-01-18",
										},
										map[string]any{
											"name": "children_age",
											"orig": "childrenAges",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "max_price_per_night",
											"orig": "maxPricePerNight",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "near",
											"orig": "near",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "Breckenridge",
										},
										map[string]any{
											"name": "radius_mile",
											"orig": "radiusMiles",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "room",
											"orig": "rooms",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"checkin",
										"checkout",
										"near",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"match": map[string]any{
				"fields": []any{},
				"name": "match",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ski/match",
								"segments": []any{
									map[string]any{
										"lit": "ski",
									},
									map[string]any{
										"lit": "match",
									},
								},
								"parts": []any{
									"ski",
									"match",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "ability",
											"orig": "ability",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "area",
											"orig": "area",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "budget",
											"orig": "budget",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "children_age",
											"orig": "childrenAges",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "depart",
											"orig": "depart",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "max_drive_hour",
											"orig": "maxDriveHours",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "night",
											"orig": "nights",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "pass",
											"orig": "pass",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "travel",
											"orig": "travel",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"model_skill": map[string]any{
				"fields": []any{},
				"name": "model_skill",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/beach/model-skill",
								"segments": []any{
									map[string]any{
										"lit": "beach",
									},
									map[string]any{
										"lit": "model-skill",
									},
								},
								"parts": []any{
									"beach",
									"model-skill",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"outlook": map[string]any{
				"fields": []any{},
				"name": "outlook",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/weather/outlook",
								"segments": []any{
									map[string]any{
										"lit": "weather",
									},
									map[string]any{
										"lit": "outlook",
									},
								},
								"parts": []any{
									"weather",
									"outlook",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "elevation_ft",
											"orig": "elevationFt",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "location",
											"orig": "location",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "Chamonix",
										},
										map[string]any{
											"name": "month",
											"orig": "months",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "spot",
											"orig": "spot",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "unit",
											"orig": "units",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"location",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"plan": map[string]any{
				"fields": []any{},
				"name": "plan",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/trip/plan",
								"segments": []any{
									map[string]any{
										"lit": "trip",
									},
									map[string]any{
										"lit": "plan",
									},
								},
								"parts": []any{
									"trip",
									"plan",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "adult",
											"orig": "adults",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "children_age",
											"orig": "childrenAges",
											"type": "`$ARRAY`",
											"kind": "query",
										},
										map[string]any{
											"name": "depart",
											"orig": "depart",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "2027-01-15",
										},
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "kind",
											"orig": "kind",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "max_price_per_night",
											"orig": "maxPricePerNight",
											"type": "`$NUMBER`",
											"kind": "query",
										},
										map[string]any{
											"name": "resort",
											"orig": "resort",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "Breckenridge",
										},
										map[string]any{
											"name": "return",
											"orig": "return",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"depart",
										"resort",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"rank": map[string]any{
				"fields": []any{},
				"name": "rank",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/beach/rank",
								"segments": []any{
									map[string]any{
										"lit": "beach",
									},
									map[string]any{
										"lit": "rank",
									},
								},
								"parts": []any{
									"beach",
									"rank",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "near",
											"orig": "near",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "radius_mile",
											"orig": "radiusMiles",
											"type": "`$NUMBER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"resort": map[string]any{
				"fields": []any{},
				"name": "resort",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/beach/resorts",
								"segments": []any{
									map[string]any{
										"lit": "beach",
									},
									map[string]any{
										"lit": "resorts",
									},
								},
								"parts": []any{
									"beach",
									"resorts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ski/resorts",
								"segments": []any{
									map[string]any{
										"lit": "ski",
									},
									map[string]any{
										"lit": "resorts",
									},
								},
								"parts": []any{
									"ski",
									"resorts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "pass",
											"orig": "pass",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"sargassum": map[string]any{
				"fields": []any{},
				"name": "sargassum",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/beach/sargassum",
								"segments": []any{
									map[string]any{
										"lit": "beach",
									},
									map[string]any{
										"lit": "sargassum",
									},
								},
								"parts": []any{
									"beach",
									"sargassum",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "resort",
											"orig": "resort",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "Tulum",
										},
										map[string]any{
											"name": "week",
											"orig": "weeks",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"resort",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"skill": map[string]any{
				"fields": []any{},
				"name": "skill",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/weather/skill",
								"segments": []any{
									map[string]any{
										"lit": "weather",
									},
									map[string]any{
										"lit": "skill",
									},
								},
								"parts": []any{
									"weather",
									"skill",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"tide": map[string]any{
				"fields": []any{},
				"name": "tide",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/beach/tides",
								"segments": []any{
									map[string]any{
										"lit": "beach",
									},
									map[string]any{
										"lit": "tides",
									},
								},
								"parts": []any{
									"beach",
									"tides",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "day",
											"orig": "days",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "resort",
											"orig": "resort",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "Tulum",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"resort",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
