# VeabirdBeach Ruby SDK



The Ruby SDK for the VeabirdBeach API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Advisory` — with named operations (`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/veabird-beach-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/veabird-beach-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-veabird-beach-sdk", path: "./veabird-beach-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "VeabirdBeach_sdk"

client = VeabirdBeachSDK.new
```

### 3. Load an advisory

```ruby
begin
  # load returns the ENTITY — call data_get for the Advisory record (raises on error).
  advisory = client.Advisory.load()
  puts advisory.data_get
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  lodging = client.Lodging.load({ "checkin" => "example", "checkout" => "example", "near" => "example" })
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = VeabirdBeachSDK.test

# Entity ops return the ENTITY (raises on error);
# data_get reads its mock record.
lodging = client.Lodging.load({ "checkin" => "example", "checkout" => "example", "near" => "example" })
puts lodging.data_get
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = VeabirdBeachSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### VeabirdBeachSDK

```ruby
require_relative "VeabirdBeach_sdk"
client = VeabirdBeachSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = VeabirdBeachSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### VeabirdBeachSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`VeabirdBeachError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `advisory = client.Advisory`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Advisory record (raises on error).
advisory = client.Advisory.load()
```


### BetterNearby

Create an instance: `better_nearby = client.BetterNearby`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the BetterNearby record (raises on error).
better_nearby = client.BetterNearby.load({ "resort" => "resort" })
```


### Condition

Create an instance: `condition = client.Condition`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Condition record (raises on error).
condition = client.Condition.load({ "resort" => "resort" })
```


### Demand

Create an instance: `demand = client.Demand`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Demand record (raises on error).
demand = client.Demand.load({ "location" => "location" })
```


### Flight

Create an instance: `flight = client.Flight`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Flight record (raises on error).
flight = client.Flight.load({ "depart" => "depart", "from" => "from", "to" => "to" })
```


### Forecast

Create an instance: `forecast = client.Forecast`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Forecast record (raises on error).
forecast = client.Forecast.load({ "location" => "location" })
```


### Hurricane

Create an instance: `hurricane = client.Hurricane`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Hurricane record (raises on error).
hurricane = client.Hurricane.load()
```


### Lodging

Create an instance: `lodging = client.Lodging`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Lodging record (raises on error).
lodging = client.Lodging.load({ "checkin" => "checkin", "checkout" => "checkout", "near" => "near" })
```


### Match

Create an instance: `match = client.Match`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Match record (raises on error).
match = client.Match.load()
```


### ModelSkill

Create an instance: `model_skill = client.ModelSkill`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ModelSkill record (raises on error).
model_skill = client.ModelSkill.load()
```


### Outlook

Create an instance: `outlook = client.Outlook`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Outlook record (raises on error).
outlook = client.Outlook.load({ "location" => "location" })
```


### Plan

Create an instance: `plan = client.Plan`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Plan record (raises on error).
plan = client.Plan.load({ "depart" => "depart", "resort" => "resort" })
```


### Rank

Create an instance: `rank = client.Rank`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Rank record (raises on error).
rank = client.Rank.load()
```


### Resort

Create an instance: `resort = client.Resort`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Resort record (raises on error).
resort = client.Resort.load()
```


### Sargassum

Create an instance: `sargassum = client.Sargassum`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Sargassum record (raises on error).
sargassum = client.Sargassum.load({ "resort" => "resort" })
```


### Skill

Create an instance: `skill = client.Skill`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Skill record (raises on error).
skill = client.Skill.load()
```


### Tide

Create an instance: `tide = client.Tide`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Tide record (raises on error).
tide = client.Tide.load({ "resort" => "resort" })
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── VeabirdBeach_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`VeabirdBeach_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
lodging = client.Lodging
lodging.load({ "checkin" => "example", "checkout" => "example", "near" => "example" })

# lodging.data_get now returns the lodging data from the last load
# lodging.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
