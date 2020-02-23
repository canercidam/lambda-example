import SQS from 'aws-sdk/clients/sqs';
import { Queue } from '../Queue';
import {
  ServiceResponse, success, failure, ErrorCode,
} from '../../common/response';
import { awsErr } from '../../common/log';

export class CloudQueue<T> implements Queue<T> {
  private client: SQS;

  constructor(endpoint: string, private queueURL: string) {
    this.client = new SQS({ endpoint });
  }

  async enqueue(data: T): Promise<ServiceResponse> {
    const result = await this.client.sendMessage({
      QueueUrl: this.queueURL,
      MessageBody: JSON.stringify(data),
    }).promise();

    const response = result.$response;
    if (response.error) {
      return failure(ErrorCode.FAILED_TO_SEND_MESSAGE, awsErr(response.error));
    }

    return success();
  }
}
