import S3 from 'aws-sdk/clients/s3';
import { Storage } from '../Storage';
import {
  ServiceResponse, success, failure, ErrorCode,
} from '../../common/response';
import { awsErr } from '../../common/log';

export class CloudStorage<T> implements Storage<T> {
  private client: S3;

  constructor(endpoint: string, private bucket: string) {
    this.client = new S3({ endpoint });
  }

  async put(key: string, data: T): Promise<ServiceResponse> {
    const result = await this.client.putObject({
      Bucket: this.bucket,
      Key: key,
      Body: JSON.stringify(data),
    }).promise();

    const response = result.$response;
    if (response.error) {
      return failure(ErrorCode.FAILED_TO_PUT_DATA, awsErr(response.error));
    }

    return success();
  }

  async get(key: string): Promise<any> {
    const result = await this.client.getObject({
      Bucket: this.bucket,
      Key: key,
    }).promise();

    const response = result.$response;
    if (response.error) {
      throw new Error(awsErr(response.error));
    }

    return Promise.resolve(result.Body);
  }
}
