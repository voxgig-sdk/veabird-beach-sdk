<?php
declare(strict_types=1);

// VeabirdBeach SDK configuration

class VeabirdBeachConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "VeabirdBeach",
                "slug" => "veabird-beach",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'now' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://veabird.com/api/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "advisory" => [],
                    "better_nearby" => [],
                    "condition" => [],
                    "demand" => [],
                    "flight" => [],
                    "forecast" => [],
                    "hurricane" => [],
                    "lodging" => [],
                    "match" => [],
                    "model_skill" => [],
                    "outlook" => [],
                    "plan" => [],
                    "rank" => [],
                    "resort" => [],
                    "sargassum" => [],
                    "skill" => [],
                    "tide" => [],
                ],
            ],
            "entity" => [
        'advisory' => [
          'fields' => [],
          'name' => 'advisory',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/beach/advisory',
                  'segments' => [
                    [
                      'lit' => 'beach',
                    ],
                    [
                      'lit' => 'advisory',
                    ],
                  ],
                  'parts' => [
                    'beach',
                    'advisory',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'resort',
                        'orig' => 'resort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'better_nearby' => [
          'fields' => [],
          'name' => 'better_nearby',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/beach/better-nearby',
                  'segments' => [
                    [
                      'lit' => 'beach',
                    ],
                    [
                      'lit' => 'better-nearby',
                    ],
                  ],
                  'parts' => [
                    'beach',
                    'better-nearby',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'radius_mile',
                        'orig' => 'radiusMiles',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'resort',
                        'orig' => 'resort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Tulum',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'resort',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'condition' => [
          'fields' => [],
          'name' => 'condition',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/beach/conditions',
                  'segments' => [
                    [
                      'lit' => 'beach',
                    ],
                    [
                      'lit' => 'conditions',
                    ],
                  ],
                  'parts' => [
                    'beach',
                    'conditions',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'resort',
                        'orig' => 'resort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Tulum',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'resort',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/ski/conditions',
                  'segments' => [
                    [
                      'lit' => 'ski',
                    ],
                    [
                      'lit' => 'conditions',
                    ],
                  ],
                  'parts' => [
                    'ski',
                    'conditions',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'resort',
                        'orig' => 'resort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Breckenridge',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'resort',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'demand' => [
          'fields' => [],
          'name' => 'demand',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/host/demand',
                  'segments' => [
                    [
                      'lit' => 'host',
                    ],
                    [
                      'lit' => 'demand',
                    ],
                  ],
                  'parts' => [
                    'host',
                    'demand',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'day',
                        'orig' => 'days',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'from',
                        'orig' => 'from',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'ical',
                        'orig' => 'ical',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'location',
                        'orig' => 'location',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Destin, FL',
                      ],
                      [
                        'name' => 'radius_mile',
                        'orig' => 'radiusMiles',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'rate',
                        'orig' => 'rate',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'rate',
                        'orig' => 'rates',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'location',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'flight' => [
          'fields' => [],
          'name' => 'flight',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/trip/flights',
                  'segments' => [
                    [
                      'lit' => 'trip',
                    ],
                    [
                      'lit' => 'flights',
                    ],
                  ],
                  'parts' => [
                    'trip',
                    'flights',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'adult',
                        'orig' => 'adults',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'children_age',
                        'orig' => 'childrenAges',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'depart',
                        'orig' => 'depart',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => '2027-01-15',
                      ],
                      [
                        'name' => 'from',
                        'orig' => 'from',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'DFW',
                      ],
                      [
                        'name' => 'return',
                        'orig' => 'return',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'to',
                        'orig' => 'to',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Breckenridge',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'depart',
                      'from',
                      'to',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'forecast' => [
          'fields' => [],
          'name' => 'forecast',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/weather/forecast',
                  'segments' => [
                    [
                      'lit' => 'weather',
                    ],
                    [
                      'lit' => 'forecast',
                    ],
                  ],
                  'parts' => [
                    'weather',
                    'forecast',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'day',
                        'orig' => 'days',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'elevation_ft',
                        'orig' => 'elevationFt',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'location',
                        'orig' => 'location',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Chamonix',
                      ],
                      [
                        'name' => 'spot',
                        'orig' => 'spot',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'unit',
                        'orig' => 'units',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'location',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'hurricane' => [
          'fields' => [],
          'name' => 'hurricane',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/beach/hurricanes',
                  'segments' => [
                    [
                      'lit' => 'beach',
                    ],
                    [
                      'lit' => 'hurricanes',
                    ],
                  ],
                  'parts' => [
                    'beach',
                    'hurricanes',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'resort',
                        'orig' => 'resort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'lodging' => [
          'fields' => [],
          'name' => 'lodging',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/trip/lodging',
                  'segments' => [
                    [
                      'lit' => 'trip',
                    ],
                    [
                      'lit' => 'lodging',
                    ],
                  ],
                  'parts' => [
                    'trip',
                    'lodging',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'adult',
                        'orig' => 'adults',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'checkin',
                        'orig' => 'checkin',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => '2027-01-15',
                      ],
                      [
                        'name' => 'checkout',
                        'orig' => 'checkout',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => '2027-01-18',
                      ],
                      [
                        'name' => 'children_age',
                        'orig' => 'childrenAges',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'max_price_per_night',
                        'orig' => 'maxPricePerNight',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'near',
                        'orig' => 'near',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Breckenridge',
                      ],
                      [
                        'name' => 'radius_mile',
                        'orig' => 'radiusMiles',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'room',
                        'orig' => 'rooms',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'checkin',
                      'checkout',
                      'near',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'match' => [
          'fields' => [],
          'name' => 'match',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/ski/match',
                  'segments' => [
                    [
                      'lit' => 'ski',
                    ],
                    [
                      'lit' => 'match',
                    ],
                  ],
                  'parts' => [
                    'ski',
                    'match',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'ability',
                        'orig' => 'ability',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'area',
                        'orig' => 'area',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'budget',
                        'orig' => 'budget',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'children_age',
                        'orig' => 'childrenAges',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'depart',
                        'orig' => 'depart',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'from',
                        'orig' => 'from',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'max_drive_hour',
                        'orig' => 'maxDriveHours',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'night',
                        'orig' => 'nights',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'pass',
                        'orig' => 'pass',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'travel',
                        'orig' => 'travel',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'model_skill' => [
          'fields' => [],
          'name' => 'model_skill',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/beach/model-skill',
                  'segments' => [
                    [
                      'lit' => 'beach',
                    ],
                    [
                      'lit' => 'model-skill',
                    ],
                  ],
                  'parts' => [
                    'beach',
                    'model-skill',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'outlook' => [
          'fields' => [],
          'name' => 'outlook',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/weather/outlook',
                  'segments' => [
                    [
                      'lit' => 'weather',
                    ],
                    [
                      'lit' => 'outlook',
                    ],
                  ],
                  'parts' => [
                    'weather',
                    'outlook',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'elevation_ft',
                        'orig' => 'elevationFt',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'location',
                        'orig' => 'location',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Chamonix',
                      ],
                      [
                        'name' => 'month',
                        'orig' => 'months',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'spot',
                        'orig' => 'spot',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'unit',
                        'orig' => 'units',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'location',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'plan' => [
          'fields' => [],
          'name' => 'plan',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/trip/plan',
                  'segments' => [
                    [
                      'lit' => 'trip',
                    ],
                    [
                      'lit' => 'plan',
                    ],
                  ],
                  'parts' => [
                    'trip',
                    'plan',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'adult',
                        'orig' => 'adults',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'children_age',
                        'orig' => 'childrenAges',
                        'type' => '`$ARRAY`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'depart',
                        'orig' => 'depart',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => '2027-01-15',
                      ],
                      [
                        'name' => 'from',
                        'orig' => 'from',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'kind',
                        'orig' => 'kind',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'max_price_per_night',
                        'orig' => 'maxPricePerNight',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'resort',
                        'orig' => 'resort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Breckenridge',
                      ],
                      [
                        'name' => 'return',
                        'orig' => 'return',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'depart',
                      'resort',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'rank' => [
          'fields' => [],
          'name' => 'rank',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/beach/rank',
                  'segments' => [
                    [
                      'lit' => 'beach',
                    ],
                    [
                      'lit' => 'rank',
                    ],
                  ],
                  'parts' => [
                    'beach',
                    'rank',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'from',
                        'orig' => 'from',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'near',
                        'orig' => 'near',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'radius_mile',
                        'orig' => 'radiusMiles',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'resort' => [
          'fields' => [],
          'name' => 'resort',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/beach/resorts',
                  'segments' => [
                    [
                      'lit' => 'beach',
                    ],
                    [
                      'lit' => 'resorts',
                    ],
                  ],
                  'parts' => [
                    'beach',
                    'resorts',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/ski/resorts',
                  'segments' => [
                    [
                      'lit' => 'ski',
                    ],
                    [
                      'lit' => 'resorts',
                    ],
                  ],
                  'parts' => [
                    'ski',
                    'resorts',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'pass',
                        'orig' => 'pass',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'sargassum' => [
          'fields' => [],
          'name' => 'sargassum',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/beach/sargassum',
                  'segments' => [
                    [
                      'lit' => 'beach',
                    ],
                    [
                      'lit' => 'sargassum',
                    ],
                  ],
                  'parts' => [
                    'beach',
                    'sargassum',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'resort',
                        'orig' => 'resort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Tulum',
                      ],
                      [
                        'name' => 'week',
                        'orig' => 'weeks',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'resort',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'skill' => [
          'fields' => [],
          'name' => 'skill',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/weather/skill',
                  'segments' => [
                    [
                      'lit' => 'weather',
                    ],
                    [
                      'lit' => 'skill',
                    ],
                  ],
                  'parts' => [
                    'weather',
                    'skill',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'tide' => [
          'fields' => [],
          'name' => 'tide',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/beach/tides',
                  'segments' => [
                    [
                      'lit' => 'beach',
                    ],
                    [
                      'lit' => 'tides',
                    ],
                  ],
                  'parts' => [
                    'beach',
                    'tides',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'day',
                        'orig' => 'days',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'resort',
                        'orig' => 'resort',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'Tulum',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'resort',
                    ],
                  ],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return VeabirdBeachFeatures::make_feature($name);
    }
}
