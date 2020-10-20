import { init as initServer } from "../../../src/server";
import { createReadStream } from "fs";
import FormData from "form-data";
import stp from "stream-to-promise"
import { Server } from "@hapi/hapi";

describe('parquet feature', () => {
    let server: Server;
    beforeAll(async () => {
        server = await initServer();
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        jest.restoreAllMocks();
        await server.stop();
    });

    it('should correctly response on parquet', async () => {
        const parquet_file = createReadStream(`${__dirname}/../../data/example.parquet`);
        const form = new FormData();
        form.append('file', parquet_file);
        const response = await server.inject({
            method: 'POST',
            url: '/v1/parquet',
            headers: form.getHeaders(),
            payload: await stp(form),
        });
        expect(response.statusCode).toEqual(200);
        expect(response.payload).toEqual(JSON.stringify({
            "schema": {
                "event": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": false,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "emitter": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": false,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "timestamp": {
                    "type": "INT64",
                    "typeLength": null,
                    "optional": false,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "transaction_id": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "creative_id": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "index_in_adpod": {
                    "type": "INT32",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "failure_message": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "session_id": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "os": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "osv": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "device_type": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "device_make": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "device_model": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "device_id": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "ip_address": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "user_agent": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "lat": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "lng": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "cm_audience_id": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "index_timeline": {
                    "type": "INT32",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "timeline_id": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "rating": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "genre": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "adbreak_duration": {
                    "type": "INT32",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "clip_id": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "partner_id": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "channel_id": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "episode_id": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "needed_by": {
                    "type": "INT64",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "stream_type": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "ch_cat": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "app_name": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "app_version": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "us_privacy": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "is_client_dnt": {
                    "type": "BOOLEAN",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "stitcher_version": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "csid": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "region": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "country": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "bundle_id": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "success": {
                    "type": "BOOLEAN",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "fw_transaction_id": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "ad_source": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "filler_clip_duration": {
                    "type": "INT32",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "latency": {
                    "type": "INT32",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "root_url": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "abm_request_duration": {
                    "type": "INT32",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "hops": {
                    "type": "INT32",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "creative_url": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "is_inline": {
                    "type": "BOOLEAN",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "creative_format": {
                    "type": "UTF8",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "is_duplicate": {
                    "type": "BOOLEAN",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                },
                "transcoding_time": {
                    "type": "INT32",
                    "typeLength": null,
                    "optional": true,
                    "repeated": false,
                    "encoding": "PLAIN",
                    "compression": "UNCOMPRESSED"
                }
            },
            "meta": {},
            "data": [{
                "event": "fw_request_sent",
                "emitter": "ad_pod",
                "timestamp": 1599744994459,
                "transaction_id": "445908e8-965c-4d12-beb1-7e5a1b747248",
                "csid": "plutotv_channel_comcastx15a4d3a00ad95e4718ae8d8db",
                "region": "US",
                "country": "EE",
                "bundle_id": "plutotv_channel_comcastx15a4d3a00ad95e4718ae8d8db"
            }, {
                "event": "fw_response_received",
                "emitter": "invalid",
                "timestamp": 1599744994478,
                "transaction_id": "445908e8-965c-4d12-beb1-7e5a1b747248",
                "failure_message": "parsing error",
                "success": false
            }]
        }));
    });

    it('should correctly response on invalid parquet', async () => {
        const parquet_file = createReadStream(`${__dirname}/../../data/invalid.parquet`);
        const form = new FormData();
        form.append('file', parquet_file);
        const response = await server.inject({
            method: 'POST',
            url: '/v1/parquet',
            headers: form.getHeaders(),
            payload: await stp(form),
        });
        expect(response.statusCode).toEqual(400);
        expect(JSON.parse(response.payload)).toEqual({
            "error": "Bad Request",
            "message": "Invalid parquet input",
            "statusCode": 400
        });
    });
});
