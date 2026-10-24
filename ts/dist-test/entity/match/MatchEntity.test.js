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
(0, node_test_1.describe)('MatchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when VEABIRD_BEACH_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('VEABIRD_BEACH_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.VeabirdBeachSDK.test();
        const ent = testsdk.Match();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.VeabirdBeachSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Match().load({ "area": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.VEABIRD_BEACH_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'match.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "match", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /ski/match", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "ability", "or": "ability", "r": false, "t": "`$ARRAY`", "index$": 0 }, { "a": true, "k": "query", "n": "area", "or": "area", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "budget", "or": "budget", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "children_age", "or": "childrenAges", "r": false, "t": "`$ARRAY`", "index$": 3 }, { "a": true, "k": "query", "n": "depart", "or": "depart", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "k": "query", "n": "from", "or": "from", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 6 }, { "a": true, "k": "query", "n": "max_drive_hour", "or": "maxDriveHours", "r": false, "t": "`$NUMBER`", "index$": 7 }, { "a": true, "k": "query", "n": "night", "or": "nights", "r": false, "t": "`$INTEGER`", "index$": 8 }, { "a": true, "k": "query", "n": "pass", "or": "pass", "r": false, "t": "`$STRING`", "index$": 9 }, { "a": true, "k": "query", "n": "travel", "or": "travel", "r": false, "t": "`$STRING`", "index$": 10 }] }, "k": "http", "m": "GET", "o": "/ski/match", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "ski" }, { "lit": "match" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "match", "name__orig": "match", "Name": "Match", "name_": "match", "name-": "match", "NAME": "MATCH", "index$": 8 }, { "active": true, "entity": "match", "key$": "BasicMatchFlow", "kind": "basic", "name": "BasicMatchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "match_ref01", "srcdatavar": "match_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-match_ref01" } }], "index$": 0 }] }, 'Match', { "GET /ski/match": { "protocol": "http", "parameters": [{ "name": "ability", "in": "query", "required": false, "description": "Ability of each skier or the group, e.g. ['intermediate'] or ['advanced','beginner'].", "style": "form", "explode": false, "schema": { "type": "array", "items": { "type": "string", "enum": ["beginner", "intermediate", "advanced", "expert"] } }, "index$": 0 }, { "name": "from", "in": "query", "required": false, "description": "Traveler's home airport code (e.g. DFW), city (e.g. 'Dallas') or 'lat,lon'.", "schema": { "type": "string" }, "index$": 1 }, { "name": "travel", "in": "query", "required": false, "description": "How they want to get there (default either).", "schema": { "type": "string", "enum": ["drive", "fly", "either"] }, "index$": 2 }, { "name": "maxDriveHours", "in": "query", "required": false, "description": "Longest acceptable drive (default 5).", "schema": { "type": "number", "minimum": 0.5, "maximum": 16 }, "index$": 3 }, { "name": "pass", "in": "query", "required": false, "description": "Season pass they hold.", "schema": { "type": "string", "enum": ["epic", "ikon", "none"] }, "index$": 4 }, { "name": "depart", "in": "query", "required": false, "description": "First ski day, YYYY-MM-DD (default today).", "schema": { "type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}$" }, "index$": 5 }, { "name": "nights", "in": "query", "required": false, "description": "Trip length in nights (default 3).", "schema": { "type": "integer", "minimum": 1, "maximum": 21 }, "index$": 6 }, { "name": "childrenAges", "in": "query", "required": false, "description": "Ages of children traveling, e.g. [6, 9].", "style": "form", "explode": false, "schema": { "type": "array", "items": { "type": "integer", "minimum": 0, "maximum": 17 }, "maxItems": 8 }, "index$": 7 }, { "name": "budget", "in": "query", "required": false, "description": "Value weights pass coverage and driving more heavily.", "schema": { "type": "string", "enum": ["value", "mid", "luxury"] }, "index$": 8 }, { "name": "area", "in": "query", "required": false, "description": "Limit to a country, state or range, e.g. 'colorado', 'utah', 'alps', 'japan', 'US'.", "schema": { "type": "string" }, "index$": 9 }, { "name": "limit", "in": "query", "required": false, "description": "How many resorts (default 5).", "schema": { "type": "integer", "minimum": 1, "maximum": 15 }, "index$": 10 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let match_ref01_data = Object.values(setup.data.existing.match)[0];
        // LOAD
        const match_ref01_ent = client.Match();
        const match_ref01_match_dt0 = {};
        const match_ref01_data_dt0 = (await match_ref01_ent.load(match_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != match_ref01_data_dt0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/match/MatchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.VeabirdBeachSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['match01', 'match02', 'match03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'VEABIRD_BEACH_TEST_MATCH_ENTID': idmap,
        'VEABIRD_BEACH_TEST_LIVE': 'FALSE',
        'VEABIRD_BEACH_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['VEABIRD_BEACH_TEST_MATCH_ENTID'];
    const live = 'TRUE' === env.VEABIRD_BEACH_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['VEABIRD_BEACH_TEST_MATCH_ENTID'];
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
//# sourceMappingURL=MatchEntity.test.js.map