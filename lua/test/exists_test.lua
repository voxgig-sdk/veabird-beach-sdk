-- VeabirdBeach SDK exists test

local sdk = require("veabird-beach_sdk")

describe("VeabirdBeachSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
