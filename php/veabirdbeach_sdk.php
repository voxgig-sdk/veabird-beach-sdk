<?php
declare(strict_types=1);

// VeabirdBeach SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class VeabirdBeachSDK implements \JsonSerializable
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new VeabirdBeachUtility();
        $this->_utility = $utility;

        $config = VeabirdBeachConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = VeabirdBeachHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = VeabirdBeachHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!VeabirdBeachFeatures::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, VeabirdBeachFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    // The options hold the credential, so the default print and json form
    // name the client and nothing more; options_map() is the way to read
    // them back.
    public function jsonSerialize(): array
    {
        return ['name' => 'VeabirdBeach'];
    }

    public function __debugInfo(): array
    {
        return $this->jsonSerialize();
    }

    public function get_utility()
    {
        return VeabirdBeachUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = VeabirdBeachHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = strtoupper(is_string($method_val) && '' !== $method_val ? $method_val : "GET");
        $allow_method = Struct::getpath($opts, "allow.method");
        if (!VeabirdBeachPrepareMethod::allowed($allow_method, $method_val)) {
            return ($utility->make_error)($ctx, $ctx->make_error("spec_method_allow",
                "Method \"" . $method_val . "\" not allowed by SDK option allow.method value: \"" .
                (is_string($allow_method) ? $allow_method : "") . "\""));
        }
        $params = VeabirdBeachHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = VeabirdBeachHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new VeabirdBeachSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        return VeabirdBeachPrepareMethod::allowed(Struct::getpath($this->options, "allow.op"), $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new VeabirdBeachError($op . "_allow",
                "VeabirdBeachSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = VeabirdBeachHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => ($utility->clean)($ctx, $fetch_err)];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = VeabirdBeachHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            $body_err = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
                if (true === Struct::getprop($fetched, "unreadable")) {
                    $failed = ($status >= 200 && $status < 300) ? null : $ctx->make_error(
                        "request_status",
                        "request: {$status}: " . (string)Struct::getprop($fetched, "statusText"));
                    $sent = $fetchdef["headers"] ?? [];
                    if (VeabirdBeachFetcher::usesDefault($ctx)) {
                        $sent = VeabirdBeachFetcher::sentHeaders($sent);
                    }
                    $body_err = VeabirdBeachResultBody::unreadable($ctx, $status, $headers,
                        Struct::getprop($fetched, "body"), $sent, $failed);
                }
            }

            $out = [
                "ok" => null === $body_err && $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
            if (null !== $body_err) {
                $out["err"] = ($utility->clean)($ctx, $body_err);
            }
            return $out;
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new VeabirdBeachError("graphql_error",
                "VeabirdBeachSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_advisory = null;

    // Canonical facade: $client->Advisory()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->advisory()
    // resolves here too.
    public function Advisory($data = null)
    {
        require_once __DIR__ . '/entity/advisory_entity.php';
        if ($data === null) {
            if ($this->_advisory === null) {
                $this->_advisory = new AdvisoryEntity($this, null);
            }
            return $this->_advisory;
        }
        return new AdvisoryEntity($this, $data);
    }


    private $_better_nearby = null;

    // Canonical facade: $client->BetterNearby()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->better_nearby()
    // resolves here too.
    public function BetterNearby($data = null)
    {
        require_once __DIR__ . '/entity/better_nearby_entity.php';
        if ($data === null) {
            if ($this->_better_nearby === null) {
                $this->_better_nearby = new BetterNearbyEntity($this, null);
            }
            return $this->_better_nearby;
        }
        return new BetterNearbyEntity($this, $data);
    }


    private $_condition = null;

    // Canonical facade: $client->Condition()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->condition()
    // resolves here too.
    public function Condition($data = null)
    {
        require_once __DIR__ . '/entity/condition_entity.php';
        if ($data === null) {
            if ($this->_condition === null) {
                $this->_condition = new ConditionEntity($this, null);
            }
            return $this->_condition;
        }
        return new ConditionEntity($this, $data);
    }


    private $_demand = null;

    // Canonical facade: $client->Demand()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->demand()
    // resolves here too.
    public function Demand($data = null)
    {
        require_once __DIR__ . '/entity/demand_entity.php';
        if ($data === null) {
            if ($this->_demand === null) {
                $this->_demand = new DemandEntity($this, null);
            }
            return $this->_demand;
        }
        return new DemandEntity($this, $data);
    }


    private $_flight = null;

    // Canonical facade: $client->Flight()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->flight()
    // resolves here too.
    public function Flight($data = null)
    {
        require_once __DIR__ . '/entity/flight_entity.php';
        if ($data === null) {
            if ($this->_flight === null) {
                $this->_flight = new FlightEntity($this, null);
            }
            return $this->_flight;
        }
        return new FlightEntity($this, $data);
    }


    private $_forecast = null;

    // Canonical facade: $client->Forecast()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->forecast()
    // resolves here too.
    public function Forecast($data = null)
    {
        require_once __DIR__ . '/entity/forecast_entity.php';
        if ($data === null) {
            if ($this->_forecast === null) {
                $this->_forecast = new ForecastEntity($this, null);
            }
            return $this->_forecast;
        }
        return new ForecastEntity($this, $data);
    }


    private $_hurricane = null;

    // Canonical facade: $client->Hurricane()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->hurricane()
    // resolves here too.
    public function Hurricane($data = null)
    {
        require_once __DIR__ . '/entity/hurricane_entity.php';
        if ($data === null) {
            if ($this->_hurricane === null) {
                $this->_hurricane = new HurricaneEntity($this, null);
            }
            return $this->_hurricane;
        }
        return new HurricaneEntity($this, $data);
    }


    private $_lodging = null;

    // Canonical facade: $client->Lodging()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->lodging()
    // resolves here too.
    public function Lodging($data = null)
    {
        require_once __DIR__ . '/entity/lodging_entity.php';
        if ($data === null) {
            if ($this->_lodging === null) {
                $this->_lodging = new LodgingEntity($this, null);
            }
            return $this->_lodging;
        }
        return new LodgingEntity($this, $data);
    }


    private $_match = null;

    // Canonical facade: $client->Match()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->match()
    // resolves here too.
    public function Match($data = null)
    {
        require_once __DIR__ . '/entity/match_entity.php';
        if ($data === null) {
            if ($this->_match === null) {
                $this->_match = new MatchEntity($this, null);
            }
            return $this->_match;
        }
        return new MatchEntity($this, $data);
    }


    private $_model_skill = null;

    // Canonical facade: $client->ModelSkill()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->model_skill()
    // resolves here too.
    public function ModelSkill($data = null)
    {
        require_once __DIR__ . '/entity/model_skill_entity.php';
        if ($data === null) {
            if ($this->_model_skill === null) {
                $this->_model_skill = new ModelSkillEntity($this, null);
            }
            return $this->_model_skill;
        }
        return new ModelSkillEntity($this, $data);
    }


    private $_outlook = null;

    // Canonical facade: $client->Outlook()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->outlook()
    // resolves here too.
    public function Outlook($data = null)
    {
        require_once __DIR__ . '/entity/outlook_entity.php';
        if ($data === null) {
            if ($this->_outlook === null) {
                $this->_outlook = new OutlookEntity($this, null);
            }
            return $this->_outlook;
        }
        return new OutlookEntity($this, $data);
    }


    private $_plan = null;

    // Canonical facade: $client->Plan()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->plan()
    // resolves here too.
    public function Plan($data = null)
    {
        require_once __DIR__ . '/entity/plan_entity.php';
        if ($data === null) {
            if ($this->_plan === null) {
                $this->_plan = new PlanEntity($this, null);
            }
            return $this->_plan;
        }
        return new PlanEntity($this, $data);
    }


    private $_rank = null;

    // Canonical facade: $client->Rank()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->rank()
    // resolves here too.
    public function Rank($data = null)
    {
        require_once __DIR__ . '/entity/rank_entity.php';
        if ($data === null) {
            if ($this->_rank === null) {
                $this->_rank = new RankEntity($this, null);
            }
            return $this->_rank;
        }
        return new RankEntity($this, $data);
    }


    private $_resort = null;

    // Canonical facade: $client->Resort()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->resort()
    // resolves here too.
    public function Resort($data = null)
    {
        require_once __DIR__ . '/entity/resort_entity.php';
        if ($data === null) {
            if ($this->_resort === null) {
                $this->_resort = new ResortEntity($this, null);
            }
            return $this->_resort;
        }
        return new ResortEntity($this, $data);
    }


    private $_sargassum = null;

    // Canonical facade: $client->Sargassum()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->sargassum()
    // resolves here too.
    public function Sargassum($data = null)
    {
        require_once __DIR__ . '/entity/sargassum_entity.php';
        if ($data === null) {
            if ($this->_sargassum === null) {
                $this->_sargassum = new SargassumEntity($this, null);
            }
            return $this->_sargassum;
        }
        return new SargassumEntity($this, $data);
    }


    private $_skill = null;

    // Canonical facade: $client->Skill()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->skill()
    // resolves here too.
    public function Skill($data = null)
    {
        require_once __DIR__ . '/entity/skill_entity.php';
        if ($data === null) {
            if ($this->_skill === null) {
                $this->_skill = new SkillEntity($this, null);
            }
            return $this->_skill;
        }
        return new SkillEntity($this, $data);
    }


    private $_tide = null;

    // Canonical facade: $client->Tide()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->tide()
    // resolves here too.
    public function Tide($data = null)
    {
        require_once __DIR__ . '/entity/tide_entity.php';
        if ($data === null) {
            if ($this->_tide === null) {
                $this->_tide = new TideEntity($this, null);
            }
            return $this->_tide;
        }
        return new TideEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new VeabirdBeachSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
