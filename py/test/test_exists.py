# VeabirdBeach SDK exists test

import pytest
from veabirdbeach_sdk import VeabirdBeachSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = VeabirdBeachSDK.test(None, None)
        assert testsdk is not None
