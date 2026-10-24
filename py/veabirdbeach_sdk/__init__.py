# VeabirdBeach SDK

from veabirdbeach_sdk.utility.voxgig_struct import voxgig_struct as vs
from veabirdbeach_sdk.core.utility_type import VeabirdBeachUtility
from veabirdbeach_sdk.core.spec import VeabirdBeachSpec
from veabirdbeach_sdk.core import helpers
from veabirdbeach_sdk.utility.prepare_method import allowed
from veabirdbeach_sdk.utility.result_body import unreadable_body

# Load utility registration (populates Utility._registrar)
from veabirdbeach_sdk.utility import register

# Load features
from veabirdbeach_sdk.feature.base_feature import VeabirdBeachBaseFeature
from veabirdbeach_sdk.features import _has_feature, _make_feature


class VeabirdBeachSDK:
    # The options hold the credential. A slot keeps them reachable as
    # `client.options` and out of `vars(client)` and every attribute dump;
    # the dict entry keeps the instance open for everything else.
    __slots__ = ("_options", "__dict__")

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self._options = None

        utility = VeabirdBeachUtility()
        self._utility = utility

        from veabirdbeach_sdk.config import shared_config
        config = shared_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        # Extension feature INSTANCES come from the RAW construction
        # options - extend is consumed exactly once, here. make_options
        # strips the key before cloning (vs.clone flattens arbitrary
        # objects), so self.options never carries the instances.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        extend = options.get("extend") if isinstance(options, dict) else None
        if not isinstance(extend, list):
            extend = []
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        # An active name with no generated feature class is
                        # legal when an extend-supplied instance carries that
                        # name (station's adopt path): the instance is added
                        # below, positioned by its own __after__ entry, so
                        # skip it here rather than add a BaseFeature stray
                        # that would silently shift feature positions.
                        if not _has_feature(fname) and any(
                            fname == (f.get("name") if isinstance(f, dict)
                                      else getattr(f, "name", None))
                            for f in extend
                        ):
                            continue
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        for f in extend:
            if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    @property
    def options(self):
        return self._options

    @options.setter
    def options(self, value):
        self._options = value

    def __repr__(self):
        return "VeabirdBeachSDK(mode=" + repr(self.mode) + ")"

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return VeabirdBeachUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"
        method = method.upper()

        allow_method = vs.getpath(options, "allow.method")
        if not allowed(allow_method, method):
            raise ctx.make_error("spec_method_allow",
                'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + str(allow_method) + '"')

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = VeabirdBeachSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        return allowed(vs.getpath(self.options, "allow.op"), op)

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "VeabirdBeachSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            # That error never passes through make_error, so it is cleaned.
            return {"ok": False, "err": utility.clean(self._rootctx, err)}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": utility.clean(ctx, fetch_err)}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            body_err = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None
                if vs.getprop(fetched, "unreadable") is True:
                    failed = None if 200 <= status < 300 else ctx.make_error(
                        "request_status",
                        "request: " + str(status) + ": " + str(vs.getprop(fetched, "statusText")))
                    body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
                                               fetchdef.get("headers"), failed)

            out = {
                "ok": body_err is None and status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }
            if body_err is not None:
                out["err"] = utility.clean(ctx, body_err)
            return out

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("VeabirdBeachSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def Advisory(self, data=None) -> "AdvisoryEntity":
        """Entity factory: client.Advisory().list() / client.Advisory().load({"id": ...})."""
        from veabirdbeach_sdk.entity.advisory_entity import AdvisoryEntity
        return AdvisoryEntity(self, data)


    def BetterNearby(self, data=None) -> "BetterNearbyEntity":
        """Entity factory: client.BetterNearby().list() / client.BetterNearby().load({"id": ...})."""
        from veabirdbeach_sdk.entity.better_nearby_entity import BetterNearbyEntity
        return BetterNearbyEntity(self, data)


    def Condition(self, data=None) -> "ConditionEntity":
        """Entity factory: client.Condition().list() / client.Condition().load({"id": ...})."""
        from veabirdbeach_sdk.entity.condition_entity import ConditionEntity
        return ConditionEntity(self, data)


    def Demand(self, data=None) -> "DemandEntity":
        """Entity factory: client.Demand().list() / client.Demand().load({"id": ...})."""
        from veabirdbeach_sdk.entity.demand_entity import DemandEntity
        return DemandEntity(self, data)


    def Flight(self, data=None) -> "FlightEntity":
        """Entity factory: client.Flight().list() / client.Flight().load({"id": ...})."""
        from veabirdbeach_sdk.entity.flight_entity import FlightEntity
        return FlightEntity(self, data)


    def Forecast(self, data=None) -> "ForecastEntity":
        """Entity factory: client.Forecast().list() / client.Forecast().load({"id": ...})."""
        from veabirdbeach_sdk.entity.forecast_entity import ForecastEntity
        return ForecastEntity(self, data)


    def Hurricane(self, data=None) -> "HurricaneEntity":
        """Entity factory: client.Hurricane().list() / client.Hurricane().load({"id": ...})."""
        from veabirdbeach_sdk.entity.hurricane_entity import HurricaneEntity
        return HurricaneEntity(self, data)


    def Lodging(self, data=None) -> "LodgingEntity":
        """Entity factory: client.Lodging().list() / client.Lodging().load({"id": ...})."""
        from veabirdbeach_sdk.entity.lodging_entity import LodgingEntity
        return LodgingEntity(self, data)


    def Match(self, data=None) -> "MatchEntity":
        """Entity factory: client.Match().list() / client.Match().load({"id": ...})."""
        from veabirdbeach_sdk.entity.match_entity import MatchEntity
        return MatchEntity(self, data)


    def ModelSkill(self, data=None) -> "ModelSkillEntity":
        """Entity factory: client.ModelSkill().list() / client.ModelSkill().load({"id": ...})."""
        from veabirdbeach_sdk.entity.model_skill_entity import ModelSkillEntity
        return ModelSkillEntity(self, data)


    def Outlook(self, data=None) -> "OutlookEntity":
        """Entity factory: client.Outlook().list() / client.Outlook().load({"id": ...})."""
        from veabirdbeach_sdk.entity.outlook_entity import OutlookEntity
        return OutlookEntity(self, data)


    def Plan(self, data=None) -> "PlanEntity":
        """Entity factory: client.Plan().list() / client.Plan().load({"id": ...})."""
        from veabirdbeach_sdk.entity.plan_entity import PlanEntity
        return PlanEntity(self, data)


    def Rank(self, data=None) -> "RankEntity":
        """Entity factory: client.Rank().list() / client.Rank().load({"id": ...})."""
        from veabirdbeach_sdk.entity.rank_entity import RankEntity
        return RankEntity(self, data)


    def Resort(self, data=None) -> "ResortEntity":
        """Entity factory: client.Resort().list() / client.Resort().load({"id": ...})."""
        from veabirdbeach_sdk.entity.resort_entity import ResortEntity
        return ResortEntity(self, data)


    def Sargassum(self, data=None) -> "SargassumEntity":
        """Entity factory: client.Sargassum().list() / client.Sargassum().load({"id": ...})."""
        from veabirdbeach_sdk.entity.sargassum_entity import SargassumEntity
        return SargassumEntity(self, data)


    def Skill(self, data=None) -> "SkillEntity":
        """Entity factory: client.Skill().list() / client.Skill().load({"id": ...})."""
        from veabirdbeach_sdk.entity.skill_entity import SkillEntity
        return SkillEntity(self, data)


    def Tide(self, data=None) -> "TideEntity":
        """Entity factory: client.Tide().list() / client.Tide().load({"id": ...})."""
        from veabirdbeach_sdk.entity.tide_entity import TideEntity
        return TideEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "VeabirdBeachSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from veabirdbeach_sdk.entity.advisory_entity import AdvisoryEntity
    from veabirdbeach_sdk.entity.better_nearby_entity import BetterNearbyEntity
    from veabirdbeach_sdk.entity.condition_entity import ConditionEntity
    from veabirdbeach_sdk.entity.demand_entity import DemandEntity
    from veabirdbeach_sdk.entity.flight_entity import FlightEntity
    from veabirdbeach_sdk.entity.forecast_entity import ForecastEntity
    from veabirdbeach_sdk.entity.hurricane_entity import HurricaneEntity
    from veabirdbeach_sdk.entity.lodging_entity import LodgingEntity
    from veabirdbeach_sdk.entity.match_entity import MatchEntity
    from veabirdbeach_sdk.entity.model_skill_entity import ModelSkillEntity
    from veabirdbeach_sdk.entity.outlook_entity import OutlookEntity
    from veabirdbeach_sdk.entity.plan_entity import PlanEntity
    from veabirdbeach_sdk.entity.rank_entity import RankEntity
    from veabirdbeach_sdk.entity.resort_entity import ResortEntity
    from veabirdbeach_sdk.entity.sargassum_entity import SargassumEntity
    from veabirdbeach_sdk.entity.skill_entity import SkillEntity
    from veabirdbeach_sdk.entity.tide_entity import TideEntity
