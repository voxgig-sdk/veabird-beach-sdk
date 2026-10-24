<?php
declare(strict_types=1);

// VeabirdBeach SDK utility: result_headers

class VeabirdBeachResultHeaders
{
    public static function call(VeabirdBeachContext $ctx): ?VeabirdBeachResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
