# VeabirdBeach TypeScript SDK



The TypeScript SDK for the VeabirdBeach API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Advisory()` — each with a small set of operations (`load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/veabird-beach-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/veabird-beach-sdk
npm install ./veabird-beach-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { VeabirdBeachSDK } from '@voxgig-sdk/veabird-beach-sdk'

const client = new VeabirdBeachSDK()
```

### 3. Load an advisory

`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const advisory = await client.Advisory().load()
  console.log(advisory.data())
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const lodging = await client.Lodging().load({ checkin: "example", checkout: "example", near: "example" })
  console.log(lodging.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = VeabirdBeachSDK.test()

const lodging = await client.Lodging().load({ checkin: 'example_checkin', checkout: 'example_checkout', near: 'example_near' })
// lodging is the Lodging entity; .data() reads its mock record
console.log(lodging.data())
```

You can also use the instance method:

```ts
const client = new VeabirdBeachSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Lodging()

// First call runs the operation and stores its result
await entity.load({ checkin: 'example_checkin', checkout: 'example_checkout', near: 'example_near' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new VeabirdBeachSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
VEABIRD_BEACH_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### VeabirdBeachSDK

#### Constructor

```ts
new VeabirdBeachSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Advisory(data?)` | `AdvisoryEntity` | Create an Advisory entity instance. |
| `BetterNearby(data?)` | `BetterNearbyEntity` | Create a BetterNearby entity instance. |
| `Condition(data?)` | `ConditionEntity` | Create a Condition entity instance. |
| `Demand(data?)` | `DemandEntity` | Create a Demand entity instance. |
| `Flight(data?)` | `FlightEntity` | Create a Flight entity instance. |
| `Forecast(data?)` | `ForecastEntity` | Create a Forecast entity instance. |
| `Hurricane(data?)` | `HurricaneEntity` | Create a Hurricane entity instance. |
| `Lodging(data?)` | `LodgingEntity` | Create a Lodging entity instance. |
| `Match(data?)` | `MatchEntity` | Create a Match entity instance. |
| `ModelSkill(data?)` | `ModelSkillEntity` | Create a ModelSkill entity instance. |
| `Outlook(data?)` | `OutlookEntity` | Create an Outlook entity instance. |
| `Plan(data?)` | `PlanEntity` | Create a Plan entity instance. |
| `Rank(data?)` | `RankEntity` | Create a Rank entity instance. |
| `Resort(data?)` | `ResortEntity` | Create a Resort entity instance. |
| `Sargassum(data?)` | `SargassumEntity` | Create a Sargassum entity instance. |
| `Skill(data?)` | `SkillEntity` | Create a Skill entity instance. |
| `Tide(data?)` | `TideEntity` | Create a Tide entity instance. |
| `tester(testopts?, sdkopts?)` | `VeabirdBeachSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `VeabirdBeachSDK.test(testopts?, sdkopts?)` | `VeabirdBeachSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): VeabirdBeachSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` resolves to a single entity object.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Advisory

| Field | Description |
| --- | --- |

Operations: load.

API path: `/beach/advisory`

#### BetterNearby

| Field | Description |
| --- | --- |

Operations: load.

API path: `/beach/better-nearby`

#### Condition

| Field | Description |
| --- | --- |

Operations: load.

API path: `/beach/conditions`

#### Demand

| Field | Description |
| --- | --- |

Operations: load.

API path: `/host/demand`

#### Flight

| Field | Description |
| --- | --- |

Operations: load.

API path: `/trip/flights`

#### Forecast

| Field | Description |
| --- | --- |

Operations: load.

API path: `/weather/forecast`

#### Hurricane

| Field | Description |
| --- | --- |

Operations: load.

API path: `/beach/hurricanes`

#### Lodging

| Field | Description |
| --- | --- |

Operations: load.

API path: `/trip/lodging`

#### Match

| Field | Description |
| --- | --- |

Operations: load.

API path: `/ski/match`

#### ModelSkill

| Field | Description |
| --- | --- |

Operations: load.

API path: `/beach/model-skill`

#### Outlook

| Field | Description |
| --- | --- |

Operations: load.

API path: `/weather/outlook`

#### Plan

| Field | Description |
| --- | --- |

Operations: load.

API path: `/trip/plan`

#### Rank

| Field | Description |
| --- | --- |

Operations: load.

API path: `/beach/rank`

#### Resort

| Field | Description |
| --- | --- |

Operations: load.

API path: `/beach/resorts`

#### Sargassum

| Field | Description |
| --- | --- |

Operations: load.

API path: `/beach/sargassum`

#### Skill

| Field | Description |
| --- | --- |

Operations: load.

API path: `/weather/skill`

#### Tide

| Field | Description |
| --- | --- |

Operations: load.

API path: `/beach/tides`



## Entities


### Advisory

Create an instance: `const advisory = client.Advisory()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const advisory = await client.Advisory().load()
```


### BetterNearby

Create an instance: `const better_nearby = client.BetterNearby()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const better_nearby = await client.BetterNearby().load({ resort: 'resort' })
```


### Condition

Create an instance: `const condition = client.Condition()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const condition = await client.Condition().load({ resort: 'resort' })
```


### Demand

Create an instance: `const demand = client.Demand()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const demand = await client.Demand().load({ location: 'location' })
```


### Flight

Create an instance: `const flight = client.Flight()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const flight = await client.Flight().load({ depart: 'depart', from: 'from', to: 'to' })
```


### Forecast

Create an instance: `const forecast = client.Forecast()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const forecast = await client.Forecast().load({ location: 'location' })
```


### Hurricane

Create an instance: `const hurricane = client.Hurricane()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const hurricane = await client.Hurricane().load()
```


### Lodging

Create an instance: `const lodging = client.Lodging()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const lodging = await client.Lodging().load({ checkin: 'checkin', checkout: 'checkout', near: 'near' })
```


### Match

Create an instance: `const match = client.Match()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const match = await client.Match().load()
```


### ModelSkill

Create an instance: `const model_skill = client.ModelSkill()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const model_skill = await client.ModelSkill().load()
```


### Outlook

Create an instance: `const outlook = client.Outlook()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const outlook = await client.Outlook().load({ location: 'location' })
```


### Plan

Create an instance: `const plan = client.Plan()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const plan = await client.Plan().load({ depart: 'depart', resort: 'resort' })
```


### Rank

Create an instance: `const rank = client.Rank()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const rank = await client.Rank().load()
```


### Resort

Create an instance: `const resort = client.Resort()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const resort = await client.Resort().load()
```


### Sargassum

Create an instance: `const sargassum = client.Sargassum()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const sargassum = await client.Sargassum().load({ resort: 'resort' })
```


### Skill

Create an instance: `const skill = client.Skill()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const skill = await client.Skill().load()
```


### Tide

Create an instance: `const tide = client.Tide()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const tide = await client.Tide().load({ resort: 'resort' })
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
veabird-beach/
├── src/
│   ├── VeabirdBeachSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { VeabirdBeachSDK } from '@voxgig-sdk/veabird-beach-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const lodging = client.Lodging()
await lodging.load({ checkin: "example", checkout: "example", near: "example" })

// lodging.data() now returns the lodging data from the last `load`
// lodging.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
