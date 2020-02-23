import SQS from 'aws-sdk/clients/sqs';
import { Queue } from '../Queue';
import {
  ServiceResponse, ok, internalErr,
} from '../../common/status';
import { awsErr } from '../../common/log';

export class CloudQueue<T> implements Queue<T> {
  private client: SQS;

  constructor(endpoint: string, private queueURL: string) {
    this.client = new SQS({ endpoint });
  }

  /**
   * Enqueues given data and returns a response.
   * @param data - data to stringify and enqueue
   */
  async enqueue(data: T): Promise<ServiceResponse> {
    const result = await this.client.sendMessage({
      QueueUrl: this.queueURL,
      MessageBody: JSON.stringify(data),
    }).promise();

    const response = result.$response;
    if (response.error) {
      return internalErr(awsErr(response.error));
    }

    return ok();
  }
}
