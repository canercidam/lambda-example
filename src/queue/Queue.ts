import { ServiceResponse } from '../common/status';

export interface Queue<T> {
  enqueue(data: T): Promise<ServiceResponse>;
}
