import Joi from 'joi';

// parquet requests
const parquetRequest = {
    payload: Joi.object({
        file: Joi.any()
            .meta({ swaggerType: 'file' })
            .description('parquet file')
    }).label('Parquet_Request')
};
const parquetResponse = Joi.object({
    schema: Joi.object()
        .pattern(Joi.any(), Joi.object({
            type: Joi.string().required(),
            typeLength: Joi.any(),
            optional: Joi.boolean().required(),
            repeated: Joi.boolean().required(),
            encoding: Joi.string().required(),
            compression: Joi.string().required()
        })).required(),
    meta: Joi.any(),
    data: Joi.any(),
}).example({
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
        "failure_message": {
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
        }
    },
    "meta": {},
    "data": [
        {
            "event": "fw_request_sent",
            "emitter": "ad_pod",
            "timestamp": 1599744994459,
            "transaction_id": "445908e8-965c-4d12-beb1-7e5a1b747248",
            "csid": "plutotv_channel_comcastx15a4d3a00ad95e4718ae8d8db",
            "region": "US",
            "country": "EE",
            "bundle_id": "plutotv_channel_comcastx15a4d3a00ad95e4718ae8d8db"
        },
        {
            "event": "fw_response_received",
            "emitter": "invalid",
            "timestamp": 1599744994478,
            "transaction_id": "445908e8-965c-4d12-beb1-7e5a1b747248",
            "failure_message": "parsing error",
            "success": false
        }
    ]
}).label('Parquet_Response');

export {
    parquetRequest,
    parquetResponse,
};
