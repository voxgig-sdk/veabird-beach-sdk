"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BetterNearbyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when VEABIRD_BEACH_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('VEABIRD_BEACH_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.VeabirdBeachSDK.test();
        const ent = testsdk.BetterNearby();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.VeabirdBeachSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.BetterNearby().load({ "date": 1, "resort": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.VEABIRD_BEACH_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'better_nearby.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "better_nearby", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /beach/better-nearby", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "date", "or": "date", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "radius_mile", "or": "radiusMiles", "r": false, "t": "`$NUMBER`", "index$": 1 }, { "a": true, "ex": "Tulum", "k": "query", "n": "resort", "or": "resort", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/beach/better-nearby", "q": { "exist": ["resort"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "beach" }, { "lit": "better-nearby" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "better_nearby", "name__orig": "better_nearby", "Name": "BetterNearby", "name_": "better_nearby", "name-": "better-nearby", "NAME": "BETTER_NEARBY", "index$": 1 }, { "active": true, "entity": "better_nearby", "key$": "BasicBetterNearbyFlow", "kind": "basic", "name": "BasicBetterNearbyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "better_nearby_ref01", "srcdatavar": "better_nearby_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-better_nearby_ref01" } }], "index$": 0 }] }, 'BetterNearby', { "GET /beach/better-nearby": { "protocol": "http", "parameters": [{ "name": "resort", "in": "query", "required": true, "schema": { "type": "string" }, "example": "Tulum", "index$": 0 }, { "name": "date", "in": "query", "required": false, "description": "YYYY-MM-DD", "schema": { "type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}$" }, "index$": 1 }, { "name": "radiusMiles", "in": "query", "required": false, "schema": { "type": "number", "minimum": 25, "maximum": 1000 }, "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let better_nearby_ref01_data = Object.values(setup.data.existing.better_nearby)[0];
        // LOAD
        const better_nearby_ref01_ent = client.BetterNearby();
        const better_nearby_ref01_match_dt0 = {};
        const better_nearby_ref01_data_dt0 = (await better_nearby_ref01_ent.load(better_nearby_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != better_nearby_ref01_data_dt0);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/better_nearby/BetterNearbyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.VeabirdBeachSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['better_nearby01', 'better_nearby02', 'better_nearby03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'VEABIRD_BEACH_TEST_BETTER_NEARBY_ENTID': idmap,
        'VEABIRD_BEACH_TEST_LIVE': 'FALSE',
        'VEABIRD_BEACH_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['VEABIRD_BEACH_TEST_BETTER_NEARBY_ENTID'];
    const live = 'TRUE' === env.VEABIRD_BEACH_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['VEABIRD_BEACH_TEST_BETTER_NEARBY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.VeabirdBeachSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.VEABIRD_BEACH_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=BetterNearbyEntity.test.js.map