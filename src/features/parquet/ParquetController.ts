import { ResponseObject, ResponseToolkit } from '@hapi/hapi';
import { ParquetRequest } from './request';
import parquet from 'parquetjs';
import { RowInterface } from "parquetjs/lib/row.interface";

export default class ParquetController {
    /**
     * Parse parquet file
     * @param {ParquetRequest} request
     * @param {ResponseToolkit} h
     * @returns {ResponseObject | Error}
     */
    public static async parquet(request: ParquetRequest, h: ResponseToolkit): Promise<ResponseObject | Error> {
        const reader = await parquet.ParquetReader.openFile(request.payload.file.path);
        let cursor = reader.getCursor();
        let record: RowInterface | null = null;
        const data = [];
        while (record = await cursor.next()) {
            data.push(record);
        }
        return h.response({
            schema: reader.getSchema().schema,
            meta: reader.getMetadata(),
            data
        });
    }
}
