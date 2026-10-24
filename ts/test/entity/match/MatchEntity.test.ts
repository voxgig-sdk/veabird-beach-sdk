

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { VeabirdBeachSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('MatchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when VEABIRD_BEACH_TEST_LIVE=TRUE.
  afterEach(liveDelay('VEABIRD_BEACH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = VeabirdBeachSDK.test()
    const ent = testsdk.Match()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = VeabirdBeachSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Match().load({"area":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.VEABIRD_BEACH_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'match.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"match","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /ski/match","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"ability","or":"ability","r":false,"t":"`$ARRAY`","index$":0},{"a":true,"k":"query","n":"area","or":"area","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"budget","or":"budget","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"children_age","or":"childrenAges","r":false,"t":"`$ARRAY`","index$":3},{"a":true,"k":"query","n":"depart","or":"depart","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"from","or":"from","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":6},{"a":true,"k":"query","n":"max_drive_hour","or":"maxDriveHours","r":false,"t":"`$NUMBER`","index$":7},{"a":true,"k":"query","n":"night","or":"nights","r":false,"t":"`$INTEGER`","index$":8},{"a":true,"k":"query","n":"pass","or":"pass","r":false,"t":"`$STRING`","index$":9},{"a":true,"k":"query","n":"travel","or":"travel","r":false,"t":"`$STRING`","index$":10}]},"k":"http","m":"GET","o":"/ski/match","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"ski"},{"lit":"match"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"match","name__orig":"match","Name":"Match","name_":"match","name-":"match","NAME":"MATCH","index$":8}, {"active":true,"entity":"match","key$":"BasicMatchFlow","kind":"basic","name":"BasicMatchFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"match_ref01","srcdatavar":"match_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-match_ref01"}}],"index$":0}]}, 'Match', {"GET /ski/match":{"protocol":"http","parameters":[{"name":"ability","in":"query","required":false,"description":"Ability of each skier or the group, e.g. ['intermediate'] or ['advanced','beginner'].","style":"form","explode":false,"schema":{"type":"array","items":{"type":"string","enum":["beginner","intermediate","advanced","expert"]}},"index$":0},{"name":"from","in":"query","required":false,"description":"Traveler's home airport code (e.g. DFW), city (e.g. 'Dallas') or 'lat,lon'.","schema":{"type":"string"},"index$":1},{"name":"travel","in":"query","required":false,"description":"How they want to get there (default either).","schema":{"type":"string","enum":["drive","fly","either"]},"index$":2},{"name":"maxDriveHours","in":"query","required":false,"description":"Longest acceptable drive (default 5).","schema":{"type":"number","minimum":0.5,"maximum":16},"index$":3},{"name":"pass","in":"query","required":false,"description":"Season pass they hold.","schema":{"type":"string","enum":["epic","ikon","none"]},"index$":4},{"name":"depart","in":"query","required":false,"description":"First ski day, YYYY-MM-DD (default today).","schema":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}$"},"index$":5},{"name":"nights","in":"query","required":false,"description":"Trip length in nights (default 3).","schema":{"type":"integer","minimum":1,"maximum":21},"index$":6},{"name":"childrenAges","in":"query","required":false,"description":"Ages of children traveling, e.g. [6, 9].","style":"form","explode":false,"schema":{"type":"array","items":{"type":"integer","minimum":0,"maximum":17},"maxItems":8},"index$":7},{"name":"budget","in":"query","required":false,"description":"Value weights pass coverage and driving more heavily.","schema":{"type":"string","enum":["value","mid","luxury"]},"index$":8},{"name":"area","in":"query","required":false,"description":"Limit to a country, state or range, e.g. 'colorado', 'utah', 'alps', 'japan', 'US'.","schema":{"type":"string"},"index$":9},{"name":"limit","in":"query","required":false,"description":"How many resorts (default 5).","schema":{"type":"integer","minimum":1,"maximum":15},"index$":10}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let match_ref01_data = Object.values(setup.data.existing.match)[0] as any

    // LOAD
    const match_ref01_ent = client.Match()
    const match_ref01_match_dt0: any = {}
    const match_ref01_data_dt0 = (await match_ref01_ent.load(match_ref01_match_dt0)).data()
    assert(null != match_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/match/MatchTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = VeabirdBeachSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['match01','match02','match03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'VEABIRD_BEACH_TEST_MATCH_ENTID': idmap,
    'VEABIRD_BEACH_TEST_LIVE': 'FALSE',
    'VEABIRD_BEACH_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['VEABIRD_BEACH_TEST_MATCH_ENTID']

  const live = 'TRUE' === env.VEABIRD_BEACH_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['VEABIRD_BEACH_TEST_MATCH_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new VeabirdBeachSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
