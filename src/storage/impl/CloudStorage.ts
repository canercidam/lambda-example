import S3, { Body } from 'aws-sdk/clients/s3';
import { Storage } from '../Storage';
import {
  ServiceResponse, internalErr, ok,
} from '../../common/status';
import { awsErr } from '../../common/log';

export class CloudStorage implements Storage<string> {
  private client: S3;

  constructor(endpoint: string, private bucket: string) {
    this.client = new S3({ endpoint });
  }

  /**
   * Puts data to bucket and returns a response.
   * @param key - object key
   * @param data - object data
   */
  async put(key: string, data: string): Promise<ServiceResponse> {
    const result = await this.client.putObject({
      Bucket: this.bucket,
      Key: key,
      Body: data,
    }).promise();

    const response = result.$response;
    if (response.error) {
      return internalErr(awsErr(response.error));
    }

    return ok();
  }

  /**
   * Gets object by key from bucket. Throws if fails.
   * @param key - object key
   */
  async get(key: string): Promise<Body> {
    const result = await this.client.getObject({
      Bucket: this.bucket,
      Key: key,
    }).promise();

    const response = result.$response;
    if (response.error) {
      throw new Error(awsErr(response.error));
    }

    return Promise.resolve(result.Body || '');
  }
}
