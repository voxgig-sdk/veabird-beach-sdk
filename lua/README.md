# VeabirdBeach Lua SDK



The Lua SDK for the VeabirdBeach API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Advisory()` — each with the same small set of operations (`load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/veabird-beach-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("veabird-beach_sdk")

local client = sdk.new()
```

### 3. Load an advisory

`load` returns the entity; `data_get()` reads its record.

```lua
local advisory, err = client:Advisory():load()
if err then error(err) end
for k, val in pairs(advisory:data_get()) do print(k, val) end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local lodging, err = client:Lodging():load({ checkin = "example", checkout = "example", near = "example" })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Lodging():load({ checkin = "example", checkout = "example", near = "example" })
-- result is the entity; data_get() reads its mock record; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
VEABIRD_BEACH_TEST_LIVE=TRUE
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### VeabirdBeachSDK

```lua
local sdk = require("veabird-beach_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### VeabirdBeachSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Advisory` | `(data) -> AdvisoryEntity` | Create an Advisory entity instance. |
| `BetterNearby` | `(data) -> BetterNearbyEntity` | Create a BetterNearby entity instance. |
| `Condition` | `(data) -> ConditionEntity` | Create a Condition entity instance. |
| `Demand` | `(data) -> DemandEntity` | Create a Demand entity instance. |
| `Flight` | `(data) -> FlightEntity` | Create a Flight entity instance. |
| `Forecast` | `(data) -> ForecastEntity` | Create a Forecast entity instance. |
| `Hurricane` | `(data) -> HurricaneEntity` | Create a Hurricane entity instance. |
| `Lodging` | `(data) -> LodgingEntity` | Create a Lodging entity instance. |
| `Match` | `(data) -> MatchEntity` | Create a Match entity instance. |
| `ModelSkill` | `(data) -> ModelSkillEntity` | Create a ModelSkill entity instance. |
| `Outlook` | `(data) -> OutlookEntity` | Create an Outlook entity instance. |
| `Plan` | `(data) -> PlanEntity` | Create a Plan entity instance. |
| `Rank` | `(data) -> RankEntity` | Create a Rank entity instance. |
| `Resort` | `(data) -> ResortEntity` | Create a Resort entity instance. |
| `Sargassum` | `(data) -> SargassumEntity` | Create a Sargassum entity instance. |
| `Skill` | `(data) -> SkillEntity` | Create a Skill entity instance. |
| `Tide` | `(data) -> TideEntity` | Create a Tide entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity, whose `data_get()` reads its record (a `table`) |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local advisory, err = client:Advisory():load()
    if err then error(err) end
    -- advisory is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Advisory

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/beach/advisory`

#### BetterNearby

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/beach/better-nearby`

#### Condition

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/beach/conditions`

#### Demand

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/host/demand`

#### Flight

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/trip/flights`

#### Forecast

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/weather/forecast`

#### Hurricane

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/beach/hurricanes`

#### Lodging

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/trip/lodging`

#### Match

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/ski/match`

#### ModelSkill

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/beach/model-skill`

#### Outlook

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/weather/outlook`

#### Plan

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/trip/plan`

#### Rank

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/beach/rank`

#### Resort

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/beach/resorts`

#### Sargassum

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/beach/sargassum`

#### Skill

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/weather/skill`

#### Tide

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/beach/tides`



## Entities


### Advisory

Create an instance: `local advisory = client:Advisory(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local advisory, err = client:Advisory():load()
```


### BetterNearby

Create an instance: `local better_nearby = client:BetterNearby(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local better_nearby, err = client:BetterNearby():load({ resort = "resort" })
```


### Condition

Create an instance: `local condition = client:Condition(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local condition, err = client:Condition():load({ resort = "resort" })
```


### Demand

Create an instance: `local demand = client:Demand(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local demand, err = client:Demand():load({ location = "location" })
```


### Flight

Create an instance: `local flight = client:Flight(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local flight, err = client:Flight():load({ depart = "depart", from = "from", to = "to" })
```


### Forecast

Create an instance: `local forecast = client:Forecast(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local forecast, err = client:Forecast():load({ location = "location" })
```


### Hurricane

Create an instance: `local hurricane = client:Hurricane(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local hurricane, err = client:Hurricane():load()
```


### Lodging

Create an instance: `local lodging = client:Lodging(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local lodging, err = client:Lodging():load({ checkin = "checkin", checkout = "checkout", near = "near" })
```


### Match

Create an instance: `local match = client:Match(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local match, err = client:Match():load()
```


### ModelSkill

Create an instance: `local model_skill = client:ModelSkill(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local model_skill, err = client:ModelSkill():load()
```


### Outlook

Create an instance: `local outlook = client:Outlook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local outlook, err = client:Outlook():load({ location = "location" })
```


### Plan

Create an instance: `local plan = client:Plan(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local plan, err = client:Plan():load({ depart = "depart", resort = "resort" })
```


### Rank

Create an instance: `local rank = client:Rank(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local rank, err = client:Rank():load()
```


### Resort

Create an instance: `local resort = client:Resort(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local resort, err = client:Resort():load()
```


### Sargassum

Create an instance: `local sargassum = client:Sargassum(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local sargassum, err = client:Sargassum():load({ resort = "resort" })
```


### Skill

Create an instance: `local skill = client:Skill(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local skill, err = client:Skill():load()
```


### Tide

Create an instance: `local tide = client:Tide(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local tide, err = client:Tide():load({ resort = "resort" })
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── veabird-beach_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`veabird-beach_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local lodging = client:Lodging()
lodging:load({ checkin = "example", checkout = "example", near = "example" })

-- lodging:data_get() now returns the lodging data from the last load
-- lodging:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
