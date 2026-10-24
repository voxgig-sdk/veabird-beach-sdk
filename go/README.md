# VeabirdBeach Golang SDK



The Golang SDK for the VeabirdBeach API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Advisory(nil)` — each with the same small set of operations (`Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/veabird-beach-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/veabird-beach-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/veabird-beach-sdk/go=../veabird-beach-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/veabird-beach-sdk/go"
)

func main() {
    client := sdk.New()

    // Load a single advisory — the value is the entity; Data() reads its record.
    advisory, err := client.Advisory(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(advisory.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
lodging, err := client.Lodging(nil).Load(map[string]any{"checkin": "example", "checkout": "example", "near": "example"}, nil)
if err != nil {
    // handle err
    return
}
_ = lodging
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

lodging, err := client.Lodging(nil).Load(
    map[string]any{"checkin": "example", "checkout": "example", "near": "example"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(lodging.(sdk.Entity).Data()) // the entity's mock record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewVeabirdBeachSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewVeabirdBeachSDK

```go
func NewVeabirdBeachSDK(options map[string]any) *VeabirdBeachSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *VeabirdBeachSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### VeabirdBeachSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Advisory` | `(data map[string]any) VeabirdBeachEntity` | Create an Advisory entity instance. |
| `BetterNearby` | `(data map[string]any) VeabirdBeachEntity` | Create a BetterNearby entity instance. |
| `Condition` | `(data map[string]any) VeabirdBeachEntity` | Create a Condition entity instance. |
| `Demand` | `(data map[string]any) VeabirdBeachEntity` | Create a Demand entity instance. |
| `Flight` | `(data map[string]any) VeabirdBeachEntity` | Create a Flight entity instance. |
| `Forecast` | `(data map[string]any) VeabirdBeachEntity` | Create a Forecast entity instance. |
| `Hurricane` | `(data map[string]any) VeabirdBeachEntity` | Create a Hurricane entity instance. |
| `Lodging` | `(data map[string]any) VeabirdBeachEntity` | Create a Lodging entity instance. |
| `Match` | `(data map[string]any) VeabirdBeachEntity` | Create a Match entity instance. |
| `ModelSkill` | `(data map[string]any) VeabirdBeachEntity` | Create a ModelSkill entity instance. |
| `Outlook` | `(data map[string]any) VeabirdBeachEntity` | Create an Outlook entity instance. |
| `Plan` | `(data map[string]any) VeabirdBeachEntity` | Create a Plan entity instance. |
| `Rank` | `(data map[string]any) VeabirdBeachEntity` | Create a Rank entity instance. |
| `Resort` | `(data map[string]any) VeabirdBeachEntity` | Create a Resort entity instance. |
| `Sargassum` | `(data map[string]any) VeabirdBeachEntity` | Create a Sargassum entity instance. |
| `Skill` | `(data map[string]any) VeabirdBeachEntity` | Create a Skill entity instance. |
| `Tide` | `(data map[string]any) VeabirdBeachEntity` | Create a Tide entity instance. |

### Entity interface (VeabirdBeachEntity)

All entities implement the `VeabirdBeachEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity, whose `Data()` reads its record (`map[string]any`) |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    advisory, err := client.Advisory(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // advisory is the entity; advisory.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

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

Create an instance: `advisory := client.Advisory(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
advisory, err := client.Advisory(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(advisory.(sdk.Entity).Data()) // the loaded entity's record
```


### BetterNearby

Create an instance: `betterNearby := client.BetterNearby(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
betterNearby, err := client.BetterNearby(nil).Load(map[string]any{"resort": "resort"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(betterNearby.(sdk.Entity).Data()) // the loaded entity's record
```


### Condition

Create an instance: `condition := client.Condition(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
condition, err := client.Condition(nil).Load(map[string]any{"resort": "resort"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(condition.(sdk.Entity).Data()) // the loaded entity's record
```


### Demand

Create an instance: `demand := client.Demand(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
demand, err := client.Demand(nil).Load(map[string]any{"location": "location"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(demand.(sdk.Entity).Data()) // the loaded entity's record
```


### Flight

Create an instance: `flight := client.Flight(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
flight, err := client.Flight(nil).Load(map[string]any{"depart": "depart", "from": "from", "to": "to"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(flight.(sdk.Entity).Data()) // the loaded entity's record
```


### Forecast

Create an instance: `forecast := client.Forecast(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
forecast, err := client.Forecast(nil).Load(map[string]any{"location": "location"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(forecast.(sdk.Entity).Data()) // the loaded entity's record
```


### Hurricane

Create an instance: `hurricane := client.Hurricane(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
hurricane, err := client.Hurricane(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(hurricane.(sdk.Entity).Data()) // the loaded entity's record
```


### Lodging

Create an instance: `lodging := client.Lodging(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
lodging, err := client.Lodging(nil).Load(map[string]any{"checkin": "checkin", "checkout": "checkout", "near": "near"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(lodging.(sdk.Entity).Data()) // the loaded entity's record
```


### Match

Create an instance: `match := client.Match(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
match, err := client.Match(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(match.(sdk.Entity).Data()) // the loaded entity's record
```


### ModelSkill

Create an instance: `modelSkill := client.ModelSkill(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
modelSkill, err := client.ModelSkill(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(modelSkill.(sdk.Entity).Data()) // the loaded entity's record
```


### Outlook

Create an instance: `outlook := client.Outlook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
outlook, err := client.Outlook(nil).Load(map[string]any{"location": "location"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(outlook.(sdk.Entity).Data()) // the loaded entity's record
```


### Plan

Create an instance: `plan := client.Plan(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
plan, err := client.Plan(nil).Load(map[string]any{"depart": "depart", "resort": "resort"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(plan.(sdk.Entity).Data()) // the loaded entity's record
```


### Rank

Create an instance: `rank := client.Rank(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
rank, err := client.Rank(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(rank.(sdk.Entity).Data()) // the loaded entity's record
```


### Resort

Create an instance: `resort := client.Resort(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
resort, err := client.Resort(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(resort.(sdk.Entity).Data()) // the loaded entity's record
```


### Sargassum

Create an instance: `sargassum := client.Sargassum(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
sargassum, err := client.Sargassum(nil).Load(map[string]any{"resort": "resort"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(sargassum.(sdk.Entity).Data()) // the loaded entity's record
```


### Skill

Create an instance: `skill := client.Skill(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
skill, err := client.Skill(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(skill.(sdk.Entity).Data()) // the loaded entity's record
```


### Tide

Create an instance: `tide := client.Tide(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
tide, err := client.Tide(nil).Load(map[string]any{"resort": "resort"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(tide.(sdk.Entity).Data()) // the loaded entity's record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/veabird-beach-sdk/go/
├── veabird-beach.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/veabird-beach-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
lodging := client.Lodging(nil)
lodging.Load(map[string]any{"checkin": "example", "checkout": "example", "near": "example"}, nil)

// lodging.Data() now returns the lodging data from the last load
// lodging.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
