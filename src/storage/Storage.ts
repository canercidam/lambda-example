import { ServiceResponse } from '../common/status';

export interface Storage<T> {
  put(key: string, data: T): Promise<ServiceResponse>;
  get(key: string): Promise<any>;
}
