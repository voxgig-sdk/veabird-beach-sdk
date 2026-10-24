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
const advisoryEntityLiveStrict = true


func TestAdvisoryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Advisory(nil)
		if ent == nil {
			t.Fatal("expected non-nil AdvisoryEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Advisory(nil).Load(map[string]any{"country": 1}, nil)
		if sdkerr, ok := err.(*core.VeabirdBeachError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := advisoryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "advisory." + _op, _mode); _shouldSkip {
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
		advisoryRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.advisory")))
		var advisoryRef01Data map[string]any
		if len(advisoryRef01DataRaw) > 0 {
			advisoryRef01Data = core.ToMapAny(advisoryRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = advisoryRef01Data

		// LOAD
		advisoryRef01Ent := client.Advisory(nil)
		advisoryRef01MatchDt0 := map[string]any{}
		advisoryRef01DataDt0Loaded, err := advisoryRef01Ent.Load(advisoryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if advisoryRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func advisoryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "advisory", "AdvisoryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read advisory test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse advisory test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"advisory01", "advisory02", "advisory03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("VEABIRD_BEACH_TEST_ADVISORY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"VEABIRD_BEACH_TEST_ADVISORY_ENTID": idmap,
		"VEABIRD_BEACH_TEST_LIVE":      "FALSE",
		"VEABIRD_BEACH_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["VEABIRD_BEACH_TEST_ADVISORY_ENTID"])
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
