# VeabirdBeach SDK exists test

require "minitest/autorun"
require_relative "../VeabirdBeach_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = VeabirdBeachSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
