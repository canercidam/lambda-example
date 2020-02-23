import { ServiceResponse } from '../common/response';

export interface Queue<T> {
  enqueue(data: T): Promise<ServiceResponse>;
}
