# VeabirdBeach Python SDK Reference

Complete API reference for the VeabirdBeach Python SDK.


## VeabirdBeachSDK

### Constructor

```python
from veabirdbeach_sdk import VeabirdBeachSDK

client = VeabirdBeachSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `VeabirdBeachSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = VeabirdBeachSDK.test()
```


### Instance Methods

#### `Advisory(data=None)`

Create a new `AdvisoryEntity` instance. Pass `None` for no initial data.

#### `BetterNearby(data=None)`

Create a new `BetterNearbyEntity` instance. Pass `None` for no initial data.

#### `Condition(data=None)`

Create a new `ConditionEntity` instance. Pass `None` for no initial data.

#### `Demand(data=None)`

Create a new `DemandEntity` instance. Pass `None` for no initial data.

#### `Flight(data=None)`

Create a new `FlightEntity` instance. Pass `None` for no initial data.

#### `Forecast(data=None)`

Create a new `ForecastEntity` instance. Pass `None` for no initial data.

#### `Hurricane(data=None)`

Create a new `HurricaneEntity` instance. Pass `None` for no initial data.

#### `Lodging(data=None)`

Create a new `LodgingEntity` instance. Pass `None` for no initial data.

#### `Match(data=None)`

Create a new `MatchEntity` instance. Pass `None` for no initial data.

#### `ModelSkill(data=None)`

Create a new `ModelSkillEntity` instance. Pass `None` for no initial data.

#### `Outlook(data=None)`

Create a new `OutlookEntity` instance. Pass `None` for no initial data.

#### `Plan(data=None)`

Create a new `PlanEntity` instance. Pass `None` for no initial data.

#### `Rank(data=None)`

Create a new `RankEntity` instance. Pass `None` for no initial data.

#### `Resort(data=None)`

Create a new `ResortEntity` instance. Pass `None` for no initial data.

#### `Sargassum(data=None)`

Create a new `SargassumEntity` instance. Pass `None` for no initial data.

#### `Skill(data=None)`

Create a new `SkillEntity` instance. Pass `None` for no initial data.

#### `Tide(data=None)`

Create a new `TideEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AdvisoryEntity

```python
advisory = client.Advisory()
```

### Operations

#### `load(reqmatch, ctrl=None) -> AdvisoryEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Advisory().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AdvisoryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BetterNearbyEntity

```python
better_nearby = client.BetterNearby()
```

### Operations

#### `load(reqmatch, ctrl=None) -> BetterNearbyEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.BetterNearby().load({"resort": "resort"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BetterNearbyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConditionEntity

```python
condition = client.Condition()
```

### Operations

#### `load(reqmatch, ctrl=None) -> ConditionEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Condition().load({"resort": "resort"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConditionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DemandEntity

```python
demand = client.Demand()
```

### Operations

#### `load(reqmatch, ctrl=None) -> DemandEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Demand().load({"location": "location"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DemandEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FlightEntity

```python
flight = client.Flight()
```

### Operations

#### `load(reqmatch, ctrl=None) -> FlightEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Flight().load({"depart": "depart", "from": "from", "to": "to"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FlightEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ForecastEntity

```python
forecast = client.Forecast()
```

### Operations

#### `load(reqmatch, ctrl=None) -> ForecastEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Forecast().load({"location": "location"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ForecastEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HurricaneEntity

```python
hurricane = client.Hurricane()
```

### Operations

#### `load(reqmatch, ctrl=None) -> HurricaneEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Hurricane().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HurricaneEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LodgingEntity

```python
lodging = client.Lodging()
```

### Operations

#### `load(reqmatch, ctrl=None) -> LodgingEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Lodging().load({"checkin": "checkin", "checkout": "checkout", "near": "near"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LodgingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MatchEntity

```python
match = client.Match()
```

### Operations

#### `load(reqmatch, ctrl=None) -> MatchEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Match().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MatchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ModelSkillEntity

```python
model_skill = client.ModelSkill()
```

### Operations

#### `load(reqmatch, ctrl=None) -> ModelSkillEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ModelSkill().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ModelSkillEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OutlookEntity

```python
outlook = client.Outlook()
```

### Operations

#### `load(reqmatch, ctrl=None) -> OutlookEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Outlook().load({"location": "location"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OutlookEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PlanEntity

```python
plan = client.Plan()
```

### Operations

#### `load(reqmatch, ctrl=None) -> PlanEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Plan().load({"depart": "depart", "resort": "resort"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlanEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RankEntity

```python
rank = client.Rank()
```

### Operations

#### `load(reqmatch, ctrl=None) -> RankEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Rank().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RankEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResortEntity

```python
resort = client.Resort()
```

### Operations

#### `load(reqmatch, ctrl=None) -> ResortEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Resort().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResortEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SargassumEntity

```python
sargassum = client.Sargassum()
```

### Operations

#### `load(reqmatch, ctrl=None) -> SargassumEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Sargassum().load({"resort": "resort"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SargassumEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SkillEntity

```python
skill = client.Skill()
```

### Operations

#### `load(reqmatch, ctrl=None) -> SkillEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Skill().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SkillEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TideEntity

```python
tide = client.Tide()
```

### Operations

#### `load(reqmatch, ctrl=None) -> TideEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Tide().load({"resort": "resort"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TideEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```python
client = VeabirdBeachSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
    },
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

