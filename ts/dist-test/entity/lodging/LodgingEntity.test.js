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
(0, node_test_1.describe)('LodgingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when VEABIRD_BEACH_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('VEABIRD_BEACH_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.VeabirdBeachSDK.test();
        const ent = testsdk.Lodging();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.VeabirdBeachSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Lodging().load({ "adult": "x", "checkin": "x", "checkout": "x", "near": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.VEABIRD_BEACH_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'lodging.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "lodging", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /trip/lodging", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "adult", "or": "adults", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "2027-01-15", "k": "query", "n": "checkin", "or": "checkin", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "2027-01-18", "k": "query", "n": "checkout", "or": "checkout", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "children_age", "or": "childrenAges", "r": false, "t": "`$ARRAY`", "index$": 3 }, { "a": true, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "k": "query", "n": "max_price_per_night", "or": "maxPricePerNight", "r": false, "t": "`$NUMBER`", "index$": 5 }, { "a": true, "ex": "Breckenridge", "k": "query", "n": "near", "or": "near", "r": true, "t": "`$STRING`", "index$": 6 }, { "a": true, "k": "query", "n": "radius_mile", "or": "radiusMiles", "r": false, "t": "`$NUMBER`", "index$": 7 }, { "a": true, "k": "query", "n": "room", "or": "rooms", "r": false, "t": "`$INTEGER`", "index$": 8 }] }, "k": "http", "m": "GET", "o": "/trip/lodging", "q": { "exist": ["checkin", "checkout", "near"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "trip" }, { "lit": "lodging" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "lodging", "name__orig": "lodging", "Name": "Lodging", "name_": "lodging", "name-": "lodging", "NAME": "LODGING", "index$": 7 }, { "active": true, "entity": "lodging", "key$": "BasicLodgingFlow", "kind": "basic", "name": "BasicLodgingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "lodging_ref01", "srcdatavar": "lodging_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-lodging_ref01" } }], "index$": 0 }] }, 'Lodging', { "GET /trip/lodging": { "protocol": "http", "parameters": [{ "name": "near", "in": "query", "required": true, "description": "Ski or beach resort name/id, or 'lat,lon'.", "schema": { "type": "string" }, "example": "Breckenridge", "index$": 0 }, { "name": "checkin", "in": "query", "required": true, "description": "YYYY-MM-DD", "schema": { "type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}$" }, "example": "2027-01-15", "index$": 1 }, { "name": "checkout", "in": "query", "required": true, "description": "YYYY-MM-DD", "schema": { "type": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}$" }, "example": "2027-01-18", "index$": 2 }, { "name": "adults", "in": "query", "required": false, "description": "Adults (default 2).", "schema": { "type": "integer", "minimum": 1, "maximum": 16 }, "index$": 3 }, { "name": "childrenAges", "in": "query", "required": false, "description": "Ages of children traveling, e.g. [6, 9].", "style": "form", "explode": false, "schema": { "type": "array", "items": { "type": "integer", "minimum": 0, "maximum": 17 }, "maxItems": 8 }, "index$": 4 }, { "name": "rooms", "in": "query", "required": false, "description": "Rooms needed (default 1).", "schema": { "type": "integer", "minimum": 1, "maximum": 8 }, "index$": 5 }, { "name": "maxPricePerNight", "in": "query", "required": false, "description": "Lodging budget per night for the whole party, in USD.", "schema": { "type": "number", "minimum": 20, "maximum": 20000 }, "index$": 6 }, { "name": "radiusMiles", "in": "query", "required": false, "description": "Search radius (default 5).", "schema": { "type": "number", "minimum": 0.5, "maximum": 30 }, "index$": 7 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 20 }, "index$": 8 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let lodging_ref01_data = Object.values(setup.data.existing.lodging)[0];
        // LOAD
        const lodging_ref01_ent = client.Lodging();
        const lodging_ref01_match_dt0 = {};
        const lodging_ref01_data_dt0 = (await lodging_ref01_ent.load(lodging_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != lodging_ref01_data_dt0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/lodging/LodgingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.VeabirdBeachSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['lodging01', 'lodging02', 'lodging03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'VEABIRD_BEACH_TEST_LODGING_ENTID': idmap,
        'VEABIRD_BEACH_TEST_LIVE': 'FALSE',
        'VEABIRD_BEACH_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['VEABIRD_BEACH_TEST_LODGING_ENTID'];
    const live = 'TRUE' === env.VEABIRD_BEACH_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['VEABIRD_BEACH_TEST_LODGING_ENTID'];
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
//# sourceMappingURL=LodgingEntity.test.js.map