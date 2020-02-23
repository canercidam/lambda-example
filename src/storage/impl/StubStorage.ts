import { ServiceResponse, success } from '../../common/response';
import { Storage } from '../Storage';

export class StubStorage<T> implements Storage<T> {
  object: { [key: string]: T } = {};

  async put(key: string, data: T): Promise<ServiceResponse> {
    this.object[key] = data;
    return success();
  }

  async get(key: string): Promise<T> {
    const data = this.object[key];
    if (data === undefined) return Promise.reject();

    return Promise.resolve(data);
  }
}
