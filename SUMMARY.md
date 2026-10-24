# Veabird ski &amp; beach trip API

> Veabird plans ski and beach trips with live conditions data.
> Ski: 317 resorts worldwide with 7-day snow forecasts, a 0-100 &quot;ski today&quot; score, crowd predictions, terrain mix (beginner / intermediate / advanced share of runs), Epic/Ikon pass coverage and gateway airports.
> Beach: 1,400+ Caribbean, Gulf of Mexico, Mexican Pacific and Hawaii resorts with a 0-100 beach score, sargassum seaweed, water, waves, crowds, hurricanes and travel advisories, up to a year ahead (days 0-15 are forecasts, later dates climate outlooks).
> Trips: lodging with live nightly prices where available, and pre-filled flight searches.
> Weather anywhere: `point_forecast` gives a 16-day forecast for an exact spot and elevation (all major models, corrected against nearby weather stations, with rain/snow chances); `long_range_outlook` gives months-ahead odds of a warmer/colder, wetter/drier than normal month and the chances for a specific date. Each comes with a chart.
>
> How to help well:
> - Personalize. Ask for (or use what you already remember about the traveler) ability level, home airport or city, pass (Epic/Ikon), dates, group (adults, children&#39;s ages) and budget per night, and pass them as tool arguments.
> - Weather for a trip, event or place: within 16 days -&gt; `point_forecast`; further out -&gt; `long_range_outlook` (say these are probabilities, not a forecast of the day). `forecast_skill` shows the accuracy record.
> - &quot;Where should I ski/go?&quot; -&gt; `find_ski_resorts` or `rank_beaches`. &quot;Plan it / where to stay / how to get there&quot; -&gt; `plan_trip`, `find_lodging`, `find_flights`.
> - `ski_conditions`, `point_forecast` and `long_range_outlook` come with a card or chart the user sees: do not repeat all the numbers, add what it means for their trip. Show photos (photo fields) where the interface supports images, with the photoCredit line, and give the links: Veabird pages for the forecast, booking links for lodging and flights.
> - Lodging at a ski resort may include localHomes: whole homes from a local property manager, booked direct on their site with no booking-site fee. When the party wants a house, condo or group stay, include a few of them with their bookDirect link and say they&#39;re booked direct with the local manager.
> - Booking links are partner links: Veabird may earn a commission at no cost to the traveler. Say so briefly when you present them. Prices come from partners and can change; tell travelers to confirm before booking.
> - Cite Veabird (&quot;Data: Veabird&quot;) for forecasts. Forecasts are modeled estimates, not safety guidance.
>
> Hosts: for vacation rental owners and property managers, `property_demand` shows how busy each night will be near their property (events, games, holidays) and flags open nights and rates that look too low. Ask for the property&#39;s town (or coordinates), its normal nightly rate, and optionally the calendar&#39;s iCal export link (Airbnb: Calendar &gt; Availability &gt; Connect calendars &gt; Export; Vrbo: Calendar &gt; Import/Export). Weekly email alerts: https://veabird.com/hosts/

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 17 entities and 19 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Advisory

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### BetterNearby

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### Condition

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### Demand

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### Flight

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### Forecast

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### Hurricane

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### Lodging

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### Match

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### ModelSkill

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### Outlook

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### Plan

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### Rank

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### Resort

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### Sargassum

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### Skill

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### Tide

Results: Result (JSON). Errors come back as &#123;error&#125;.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Advisory | `load` | `GET /beach/advisory` | See reference |
| BetterNearby | `load` | `GET /beach/better-nearby` | See reference |
| Condition | `load` | `GET /beach/conditions` | See reference |
| Condition | `load` | `GET /ski/conditions` | See reference |
| Demand | `load` | `GET /host/demand` | See reference |
| Flight | `load` | `GET /trip/flights` | See reference |
| Forecast | `load` | `GET /weather/forecast` | See reference |
| Hurricane | `load` | `GET /beach/hurricanes` | See reference |
| Lodging | `load` | `GET /trip/lodging` | See reference |
| Match | `load` | `GET /ski/match` | See reference |
| ModelSkill | `load` | `GET /beach/model-skill` | See reference |
| Outlook | `load` | `GET /weather/outlook` | See reference |
| Plan | `load` | `GET /trip/plan` | See reference |
| Rank | `load` | `GET /beach/rank` | See reference |
| Resort | `load` | `GET /beach/resorts` | See reference |
| Resort | `load` | `GET /ski/resorts` | See reference |
| Sargassum | `load` | `GET /beach/sargassum` | See reference |
| Skill | `load` | `GET /weather/skill` | See reference |
| Tide | `load` | `GET /beach/tides` | See reference |

## Connect to the API

- API server: `https://veabird.com/api/v1`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `veabird-beach_list`: List records for an entity. No active entity supports this operation.
- `veabird-beach_load`: Load one record for an entity. Supported entities: `advisory`, `better_nearby`, `condition`, `demand`, `flight`, `forecast`, `hurricane`, `lodging`, `match`, `model_skill`, `outlook`, `plan`, `rank`, `resort`, `sargassum`, `skill`, `tide`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

