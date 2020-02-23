import { ServiceResponse, ok } from '../../common/status';
import { Queue } from '../Queue';

export class StubQueue<T> implements Queue<T> {
  array: any[] = [];

  async enqueue(data: T): Promise<ServiceResponse> {
    this.array.push(data);
    return ok();
  }
}
