package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/veabird-beach-sdk/go"
	"github.com/voxgig-sdk/veabird-beach-sdk/go/core"

	vs "github.com/voxgig-sdk/veabird-beach-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const model_skillEntityLiveStrict = true


func TestModelSkillEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ModelSkill(nil)
		if ent == nil {
			t.Fatal("expected non-nil ModelSkillEntity")
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := model_skillBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "model_skill." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		modelSkillRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.model_skill")))
		var modelSkillRef01Data map[string]any
		if len(modelSkillRef01DataRaw) > 0 {
			modelSkillRef01Data = core.ToMapAny(modelSkillRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = modelSkillRef01Data

		// LOAD
		modelSkillRef01Ent := client.ModelSkill(nil)
		modelSkillRef01MatchDt0 := map[string]any{}
		modelSkillRef01DataDt0Loaded, err := modelSkillRef01Ent.Load(modelSkillRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if modelSkillRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func model_skillBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "model_skill", "ModelSkillTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read model_skill test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse model_skill test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"model_skill01", "model_skill02", "model_skill03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("VEABIRD_BEACH_TEST_MODEL_SKILL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"VEABIRD_BEACH_TEST_MODEL_SKILL_ENTID": idmap,
		"VEABIRD_BEACH_TEST_LIVE":      "FALSE",
		"VEABIRD_BEACH_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["VEABIRD_BEACH_TEST_MODEL_SKILL_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["VEABIRD_BEACH_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewVeabirdBeachSDK(core.ToMapAny(mergedOpts))
	}

	live := env["VEABIRD_BEACH_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["VEABIRD_BEACH_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
