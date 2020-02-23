import { ServiceResponse, success } from '../../common/response';
import { Queue } from '../Queue';

export class StubQueue<T> implements Queue<T> {
  array: any[] = [];

  async enqueue(data: T): Promise<ServiceResponse> {
    this.array.push(data);
    return success();
  }
}
