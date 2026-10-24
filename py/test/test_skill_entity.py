# Skill entity test

import json
import os
import time

import pytest

from veabirdbeach_sdk.utility.voxgig_struct import voxgig_struct as vs
from veabirdbeach_sdk import VeabirdBeachSDK
from veabirdbeach_sdk.core import helpers
from veabirdbeach_sdk.config import shared_config
from veabirdbeach_sdk.feature.base_feature import VeabirdBeachBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestSkillEntity:

    def test_should_create_instance(self):
        testsdk = VeabirdBeachSDK.test(None, None)
        ent = testsdk.Skill(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _skill_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "skill." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        skill_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.skill")))
        skill_ref01_data = None
        if len(skill_ref01_data_raw) > 0:
            skill_ref01_data = helpers.to_map(skill_ref01_data_raw[0][1])

        # LOAD
        skill_ref01_ent = client.Skill(None)
        skill_ref01_match_dt0 = {}
        skill_ref01_data_dt0_loaded = skill_ref01_ent.load(skill_ref01_match_dt0, None)
        assert skill_ref01_data_dt0_loaded is not None



def _skill_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/skill/SkillTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = VeabirdBeachSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["skill01", "skill02", "skill03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "VEABIRD_BEACH_TEST_SKILL_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "VEABIRD_BEACH_TEST_SKILL_ENTID": idmap,
        "VEABIRD_BEACH_TEST_LIVE": "FALSE",
        "VEABIRD_BEACH_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("VEABIRD_BEACH_TEST_SKILL_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("VEABIRD_BEACH_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
            },
            extra or {},
        ])
        client = VeabirdBeachSDK(helpers.to_map(merged_opts))

    _live = env.get("VEABIRD_BEACH_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("VEABIRD_BEACH_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
