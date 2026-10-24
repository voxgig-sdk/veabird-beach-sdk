"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "advisory",
        "accessor": "Advisory",
        "op": "load",
        "method": "GET",
        "path": "/beach/advisory",
        "args": [],
        "select": {
            "country": "v1",
            "resort": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country",
            "resort"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "resort",
                "wire": "resort"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "better_nearby",
        "accessor": "BetterNearby",
        "op": "load",
        "method": "GET",
        "path": "/beach/better-nearby",
        "args": [],
        "select": {
            "resort": "Tulum",
            "date": "v1",
            "radius_mile": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "resort",
            "date",
            "radiusMiles"
        ],
        "queryArgs": [
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "radius_mile",
                "wire": "radiusMiles"
            },
            {
                "name": "resort",
                "wire": "resort"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "demand",
        "accessor": "Demand",
        "op": "load",
        "method": "GET",
        "path": "/host/demand",
        "args": [],
        "select": {
            "location": "Destin, FL",
            "day": "v1",
            "from": "v1",
            "ical": "v1",
            "radius_mile": "v1",
            "rate": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "location",
            "ical",
            "rate",
            "rates",
            "from",
            "days",
            "radiusMiles"
        ],
        "queryArgs": [
            {
                "name": "day",
                "wire": "days"
            },
            {
                "name": "from",
                "wire": "from"
            },
            {
                "name": "ical",
                "wire": "ical"
            },
            {
                "name": "location",
                "wire": "location"
            },
            {
                "name": "radius_mile",
                "wire": "radiusMiles"
            },
            {
                "name": "rate",
                "wire": "rate"
            },
            {
                "name": "rate",
                "wire": "rates"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "flight",
        "accessor": "Flight",
        "op": "load",
        "method": "GET",
        "path": "/trip/flights",
        "args": [],
        "select": {
            "depart": "2027-01-15",
            "from": "DFW",
            "to": "Breckenridge",
            "adult": "v1",
            "children_age": "v1",
            "return": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "from",
            "to",
            "depart",
            "return",
            "adults",
            "childrenAges"
        ],
        "queryArgs": [
            {
                "name": "adult",
                "wire": "adults"
            },
            {
                "name": "children_age",
                "wire": "childrenAges"
            },
            {
                "name": "depart",
                "wire": "depart"
            },
            {
                "name": "from",
                "wire": "from"
            },
            {
                "name": "return",
                "wire": "return"
            },
            {
                "name": "to",
                "wire": "to"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "forecast",
        "accessor": "Forecast",
        "op": "load",
        "method": "GET",
        "path": "/weather/forecast",
        "args": [],
        "select": {
            "location": "Chamonix",
            "day": "v1",
            "elevation_ft": "v1",
            "spot": "v1",
            "unit": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "location",
            "spot",
            "elevationFt",
            "days",
            "units"
        ],
        "queryArgs": [
            {
                "name": "day",
                "wire": "days"
            },
            {
                "name": "elevation_ft",
                "wire": "elevationFt"
            },
            {
                "name": "location",
                "wire": "location"
            },
            {
                "name": "spot",
                "wire": "spot"
            },
            {
                "name": "unit",
                "wire": "units"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "hurricane",
        "accessor": "Hurricane",
        "op": "load",
        "method": "GET",
        "path": "/beach/hurricanes",
        "args": [],
        "select": {
            "resort": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "resort"
        ],
        "queryArgs": [
            {
                "name": "resort",
                "wire": "resort"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "lodging",
        "accessor": "Lodging",
        "op": "load",
        "method": "GET",
        "path": "/trip/lodging",
        "args": [],
        "select": {
            "checkin": "2027-01-15",
            "checkout": "2027-01-18",
            "near": "Breckenridge",
            "adult": "v1",
            "children_age": "v1",
            "limit": "v1",
            "max_price_per_night": "v1",
            "radius_mile": "v1",
            "room": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "near",
            "checkin",
            "checkout",
            "adults",
            "childrenAges",
            "rooms",
            "maxPricePerNight",
            "radiusMiles",
            "limit"
        ],
        "queryArgs": [
            {
                "name": "adult",
                "wire": "adults"
            },
            {
                "name": "checkin",
                "wire": "checkin"
            },
            {
                "name": "checkout",
                "wire": "checkout"
            },
            {
                "name": "children_age",
                "wire": "childrenAges"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "max_price_per_night",
                "wire": "maxPricePerNight"
            },
            {
                "name": "near",
                "wire": "near"
            },
            {
                "name": "radius_mile",
                "wire": "radiusMiles"
            },
            {
                "name": "room",
                "wire": "rooms"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "match",
        "accessor": "Match",
        "op": "load",
        "method": "GET",
        "path": "/ski/match",
        "args": [],
        "select": {
            "ability": "v1",
            "area": "v1",
            "budget": "v1",
            "children_age": "v1",
            "depart": "v1",
            "from": "v1",
            "limit": "v1",
            "max_drive_hour": "v1",
            "night": "v1",
            "pass": "v1",
            "travel": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "ability",
            "from",
            "travel",
            "maxDriveHours",
            "pass",
            "depart",
            "nights",
            "childrenAges",
            "budget",
            "area",
            "limit"
        ],
        "queryArgs": [
            {
                "name": "ability",
                "wire": "ability"
            },
            {
                "name": "area",
                "wire": "area"
            },
            {
                "name": "budget",
                "wire": "budget"
            },
            {
                "name": "children_age",
                "wire": "childrenAges"
            },
            {
                "name": "depart",
                "wire": "depart"
            },
            {
                "name": "from",
                "wire": "from"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "max_drive_hour",
                "wire": "maxDriveHours"
            },
            {
                "name": "night",
                "wire": "nights"
            },
            {
                "name": "pass",
                "wire": "pass"
            },
            {
                "name": "travel",
                "wire": "travel"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "model_skill",
        "accessor": "ModelSkill",
        "op": "load",
        "method": "GET",
        "path": "/beach/model-skill",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "outlook",
        "accessor": "Outlook",
        "op": "load",
        "method": "GET",
        "path": "/weather/outlook",
        "args": [],
        "select": {
            "location": "Chamonix",
            "date": "v1",
            "elevation_ft": "v1",
            "month": "v1",
            "spot": "v1",
            "start": "v1",
            "unit": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "location",
            "spot",
            "elevationFt",
            "date",
            "start",
            "months",
            "units"
        ],
        "queryArgs": [
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "elevation_ft",
                "wire": "elevationFt"
            },
            {
                "name": "location",
                "wire": "location"
            },
            {
                "name": "month",
                "wire": "months"
            },
            {
                "name": "spot",
                "wire": "spot"
            },
            {
                "name": "start",
                "wire": "start"
            },
            {
                "name": "unit",
                "wire": "units"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "plan",
        "accessor": "Plan",
        "op": "load",
        "method": "GET",
        "path": "/trip/plan",
        "args": [],
        "select": {
            "depart": "2027-01-15",
            "resort": "Breckenridge",
            "adult": "v1",
            "children_age": "v1",
            "from": "v1",
            "kind": "v1",
            "max_price_per_night": "v1",
            "return": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "resort",
            "kind",
            "from",
            "depart",
            "return",
            "adults",
            "childrenAges",
            "maxPricePerNight"
        ],
        "queryArgs": [
            {
                "name": "adult",
                "wire": "adults"
            },
            {
                "name": "children_age",
                "wire": "childrenAges"
            },
            {
                "name": "depart",
                "wire": "depart"
            },
            {
                "name": "from",
                "wire": "from"
            },
            {
                "name": "kind",
                "wire": "kind"
            },
            {
                "name": "max_price_per_night",
                "wire": "maxPricePerNight"
            },
            {
                "name": "resort",
                "wire": "resort"
            },
            {
                "name": "return",
                "wire": "return"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "rank",
        "accessor": "Rank",
        "op": "load",
        "method": "GET",
        "path": "/beach/rank",
        "args": [],
        "select": {
            "date": "v1",
            "from": "v1",
            "limit": "v1",
            "near": "v1",
            "query": "v1",
            "radius_mile": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "date",
            "query",
            "near",
            "radiusMiles",
            "from",
            "limit"
        ],
        "queryArgs": [
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "from",
                "wire": "from"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "near",
                "wire": "near"
            },
            {
                "name": "query",
                "wire": "query"
            },
            {
                "name": "radius_mile",
                "wire": "radiusMiles"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "sargassum",
        "accessor": "Sargassum",
        "op": "load",
        "method": "GET",
        "path": "/beach/sargassum",
        "args": [],
        "select": {
            "resort": "Tulum",
            "week": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "resort",
            "weeks"
        ],
        "queryArgs": [
            {
                "name": "resort",
                "wire": "resort"
            },
            {
                "name": "week",
                "wire": "weeks"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "skill",
        "accessor": "Skill",
        "op": "load",
        "method": "GET",
        "path": "/weather/skill",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "tide",
        "accessor": "Tide",
        "op": "load",
        "method": "GET",
        "path": "/beach/tides",
        "args": [],
        "select": {
            "resort": "Tulum",
            "day": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "resort",
            "days"
        ],
        "queryArgs": [
            {
                "name": "day",
                "wire": "days"
            },
            {
                "name": "resort",
                "wire": "resort"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map