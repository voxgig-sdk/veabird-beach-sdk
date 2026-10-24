"use strict";
// VeabirdBeach Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.VeabirdBeachSDK = exports.VeabirdBeachEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const AdvisoryEntity_1 = require("./entity/AdvisoryEntity");
const BetterNearbyEntity_1 = require("./entity/BetterNearbyEntity");
const ConditionEntity_1 = require("./entity/ConditionEntity");
const DemandEntity_1 = require("./entity/DemandEntity");
const FlightEntity_1 = require("./entity/FlightEntity");
const ForecastEntity_1 = require("./entity/ForecastEntity");
const HurricaneEntity_1 = require("./entity/HurricaneEntity");
const LodgingEntity_1 = require("./entity/LodgingEntity");
const MatchEntity_1 = require("./entity/MatchEntity");
const ModelSkillEntity_1 = require("./entity/ModelSkillEntity");
const OutlookEntity_1 = require("./entity/OutlookEntity");
const PlanEntity_1 = require("./entity/PlanEntity");
const RankEntity_1 = require("./entity/RankEntity");
const ResortEntity_1 = require("./entity/ResortEntity");
const SargassumEntity_1 = require("./entity/SargassumEntity");
const SkillEntity_1 = require("./entity/SkillEntity");
const TideEntity_1 = require("./entity/TideEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const VeabirdBeachEntityBase_1 = require("./VeabirdBeachEntityBase");
Object.defineProperty(exports, "VeabirdBeachEntityBase", { enumerable: true, get: function () { return VeabirdBeachEntityBase_1.VeabirdBeachEntityBase; } });
const Utility_1 = require("./utility/Utility");
const ResultBodyUtility_1 = require("./utility/ResultBodyUtility");
const MakeRequestUtility_1 = require("./utility/MakeRequestUtility");
const PrepareMethodUtility_1 = require("./utility/PrepareMethodUtility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class VeabirdBeachSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        for (const key of ['_options', '_rootctx', '_features']) {
            Object.defineProperty(this, key, {
                value: this[key], enumerable: false, writable: true, configurable: true
            });
        }
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const method = String(fetchargs.method || 'GET').toUpperCase();
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.method, method)) {
            return ctx.error('spec_method_allow', 'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + options.allow.method + '"');
        }
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method,
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!(0, PrepareMethodUtility_1.allowed)(this._options.allow.op, 'direct')) {
            return {
                ok: false,
                err: new Error('VeabirdBeachSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return { ok: false, err: utility.clean(this._rootctx, fetchdef) };
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            if (true === fetchdef.signal?.aborted) {
                throw fetchdef.signal.reason;
            }
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, fetched)) };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            let err = undefined;
            if (!noBody) {
                let text = undefined;
                try {
                    const raw = fetched;
                    if ('function' === typeof raw.text) {
                        text = await raw.text();
                        json = '' === text.trim() ? undefined : JSON.parse(text);
                    }
                    else {
                        json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                    }
                }
                catch (parseErr) {
                    if ('SyntaxError' !== parseErr?.name) {
                        throw parseErr;
                    }
                    err = (0, ResultBodyUtility_1.unreadableBody)(ctx, {
                        status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
                        failed: 200 <= status && status < 300 ? undefined :
                            ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
                    });
                }
            }
            return {
                ok: null == err && status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
                ...(null == err ? {} : { err: utility.clean(ctx, err) }),
            };
        }
        catch (err) {
            return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, err)) };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.op, 'graphql')) {
            return {
                ok: false,
                err: new Error('VeabirdBeachSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('VeabirdBeachSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.Advisory().list()` / `client.Advisory().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Advisory(entopts) {
        const self = this;
        return new AdvisoryEntity_1.AdvisoryEntity(self, entopts);
    }
    // Entity access: `client.BetterNearby().list()` / `client.BetterNearby().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BetterNearby(entopts) {
        const self = this;
        return new BetterNearbyEntity_1.BetterNearbyEntity(self, entopts);
    }
    // Entity access: `client.Condition().list()` / `client.Condition().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Condition(entopts) {
        const self = this;
        return new ConditionEntity_1.ConditionEntity(self, entopts);
    }
    // Entity access: `client.Demand().list()` / `client.Demand().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Demand(entopts) {
        const self = this;
        return new DemandEntity_1.DemandEntity(self, entopts);
    }
    // Entity access: `client.Flight().list()` / `client.Flight().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Flight(entopts) {
        const self = this;
        return new FlightEntity_1.FlightEntity(self, entopts);
    }
    // Entity access: `client.Forecast().list()` / `client.Forecast().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Forecast(entopts) {
        const self = this;
        return new ForecastEntity_1.ForecastEntity(self, entopts);
    }
    // Entity access: `client.Hurricane().list()` / `client.Hurricane().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Hurricane(entopts) {
        const self = this;
        return new HurricaneEntity_1.HurricaneEntity(self, entopts);
    }
    // Entity access: `client.Lodging().list()` / `client.Lodging().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Lodging(entopts) {
        const self = this;
        return new LodgingEntity_1.LodgingEntity(self, entopts);
    }
    // Entity access: `client.Match().list()` / `client.Match().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Match(entopts) {
        const self = this;
        return new MatchEntity_1.MatchEntity(self, entopts);
    }
    // Entity access: `client.ModelSkill().list()` / `client.ModelSkill().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ModelSkill(entopts) {
        const self = this;
        return new ModelSkillEntity_1.ModelSkillEntity(self, entopts);
    }
    // Entity access: `client.Outlook().list()` / `client.Outlook().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Outlook(entopts) {
        const self = this;
        return new OutlookEntity_1.OutlookEntity(self, entopts);
    }
    // Entity access: `client.Plan().list()` / `client.Plan().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Plan(entopts) {
        const self = this;
        return new PlanEntity_1.PlanEntity(self, entopts);
    }
    // Entity access: `client.Rank().list()` / `client.Rank().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Rank(entopts) {
        const self = this;
        return new RankEntity_1.RankEntity(self, entopts);
    }
    // Entity access: `client.Resort().list()` / `client.Resort().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Resort(entopts) {
        const self = this;
        return new ResortEntity_1.ResortEntity(self, entopts);
    }
    // Entity access: `client.Sargassum().list()` / `client.Sargassum().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Sargassum(entopts) {
        const self = this;
        return new SargassumEntity_1.SargassumEntity(self, entopts);
    }
    // Entity access: `client.Skill().list()` / `client.Skill().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Skill(entopts) {
        const self = this;
        return new SkillEntity_1.SkillEntity(self, entopts);
    }
    // Entity access: `client.Tide().list()` / `client.Tide().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Tide(entopts) {
        const self = this;
        return new TideEntity_1.TideEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new VeabirdBeachSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return VeabirdBeachSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'VeabirdBeach' };
    }
    toString() {
        return 'VeabirdBeach ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.VeabirdBeachSDK = VeabirdBeachSDK;
const SDK = VeabirdBeachSDK;
exports.SDK = SDK;
//# sourceMappingURL=VeabirdBeachSDK.js.map