# VeabirdBeach TypeScript SDK Reference

Complete API reference for the VeabirdBeach TypeScript SDK.


## VeabirdBeachSDK

### Constructor

```ts
new VeabirdBeachSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `VeabirdBeachSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = VeabirdBeachSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `VeabirdBeachSDK` instance in test mode.


### Instance Methods

#### `Advisory(data?: object)`

Create a new `Advisory` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AdvisoryEntity` instance.

#### `BetterNearby(data?: object)`

Create a new `BetterNearby` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BetterNearbyEntity` instance.

#### `Condition(data?: object)`

Create a new `Condition` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConditionEntity` instance.

#### `Demand(data?: object)`

Create a new `Demand` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DemandEntity` instance.

#### `Flight(data?: object)`

Create a new `Flight` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FlightEntity` instance.

#### `Forecast(data?: object)`

Create a new `Forecast` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ForecastEntity` instance.

#### `Hurricane(data?: object)`

Create a new `Hurricane` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HurricaneEntity` instance.

#### `Lodging(data?: object)`

Create a new `Lodging` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LodgingEntity` instance.

#### `Match(data?: object)`

Create a new `Match` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MatchEntity` instance.

#### `ModelSkill(data?: object)`

Create a new `ModelSkill` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ModelSkillEntity` instance.

#### `Outlook(data?: object)`

Create a new `Outlook` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OutlookEntity` instance.

#### `Plan(data?: object)`

Create a new `Plan` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PlanEntity` instance.

#### `Rank(data?: object)`

Create a new `Rank` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RankEntity` instance.

#### `Resort(data?: object)`

Create a new `Resort` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResortEntity` instance.

#### `Sargassum(data?: object)`

Create a new `Sargassum` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SargassumEntity` instance.

#### `Skill(data?: object)`

Create a new `Skill` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SkillEntity` instance.

#### `Tide(data?: object)`

Create a new `Tide` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TideEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `VeabirdBeachSDK.test()`.

**Returns:** `VeabirdBeachSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## AdvisoryEntity

```ts
const advisory = client.Advisory()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Advisory().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AdvisoryEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BetterNearbyEntity

```ts
const better_nearby = client.BetterNearby()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.BetterNearby().load({ resort: 'resort' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BetterNearbyEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConditionEntity

```ts
const condition = client.Condition()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Condition().load({ resort: 'resort' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConditionEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DemandEntity

```ts
const demand = client.Demand()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Demand().load({ location: 'location' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DemandEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FlightEntity

```ts
const flight = client.Flight()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Flight().load({ depart: 'depart', from: 'from', to: 'to' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FlightEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ForecastEntity

```ts
const forecast = client.Forecast()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Forecast().load({ location: 'location' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ForecastEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HurricaneEntity

```ts
const hurricane = client.Hurricane()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Hurricane().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HurricaneEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LodgingEntity

```ts
const lodging = client.Lodging()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Lodging().load({ checkin: 'checkin', checkout: 'checkout', near: 'near' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LodgingEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MatchEntity

```ts
const match = client.Match()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Match().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MatchEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ModelSkillEntity

```ts
const model_skill = client.ModelSkill()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ModelSkill().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ModelSkillEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OutlookEntity

```ts
const outlook = client.Outlook()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Outlook().load({ location: 'location' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OutlookEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PlanEntity

```ts
const plan = client.Plan()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Plan().load({ depart: 'depart', resort: 'resort' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PlanEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RankEntity

```ts
const rank = client.Rank()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Rank().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RankEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResortEntity

```ts
const resort = client.Resort()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Resort().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResortEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SargassumEntity

```ts
const sargassum = client.Sargassum()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Sargassum().load({ resort: 'resort' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SargassumEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SkillEntity

```ts
const skill = client.Skill()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Skill().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SkillEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TideEntity

```ts
const tide = client.Tide()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Tide().load({ resort: 'resort' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TideEntity` instance with the same client and
options.

#### `client()`

Return the parent `VeabirdBeachSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new VeabirdBeachSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

