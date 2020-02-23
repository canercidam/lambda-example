import { ServiceResponse, ok } from '../../common/status';
import { Storage } from '../Storage';

export class StubStorage<T> implements Storage<T> {
  object: { [key: string]: T } = {};

  async put(key: string, data: T): Promise<ServiceResponse> {
    this.object[key] = data;
    return ok();
  }

  async get(key: string): Promise<T> {
    const data = this.object[key];
    if (data === undefined) return Promise.reject();

    return Promise.resolve(data);
  }
}
