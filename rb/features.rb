# VeabirdBeach SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module VeabirdBeachFeatures
  def self.make_feature(name)
    case name
    when "base"
      VeabirdBeachBaseFeature.new
    when "ratelimit"
      VeabirdBeachRatelimitFeature.new
    when "retry"
      VeabirdBeachRetryFeature.new
    when "test"
      VeabirdBeachTestFeature.new
    when "timeout"
      VeabirdBeachTimeoutFeature.new
    else
      VeabirdBeachBaseFeature.new
    end
  end
end
