import { ServiceResponse } from '../common/response';

export interface Storage<T> {
  put(key: string, data: T): Promise<ServiceResponse>;
  get(key: string): Promise<T>;
}
