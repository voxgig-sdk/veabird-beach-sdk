-- Condition entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("veabird-beach_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("ConditionEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Condition(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:Condition(nil):load({ ["date"] = 1, ["resort"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = condition_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "condition." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local condition_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.condition")))
    local condition_ref01_data = nil
    if #condition_ref01_data_raw > 0 then
      condition_ref01_data = helpers.to_map(condition_ref01_data_raw[1][2])
    end

    -- LOAD
    local condition_ref01_ent = client:Condition(nil)
    local condition_ref01_match_dt0 = {}
    local condition_ref01_data_dt0_loaded, err = condition_ref01_ent:load(condition_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(condition_ref01_data_dt0_loaded)

  end)
end)

function condition_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/condition/ConditionTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read condition test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "condition01", "condition02", "condition03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("VEABIRD_BEACH_TEST_CONDITION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["VEABIRD_BEACH_TEST_CONDITION_ENTID"] = idmap,
    ["VEABIRD_BEACH_TEST_LIVE"] = "FALSE",
    ["VEABIRD_BEACH_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["VEABIRD_BEACH_TEST_CONDITION_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["VEABIRD_BEACH_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["VEABIRD_BEACH_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["VEABIRD_BEACH_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
