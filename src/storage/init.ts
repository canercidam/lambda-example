import { Storage } from './Storage';
import { StubStorage } from './impl/StubStorage';
import { Environment, getEnv } from '../common/env';
import { CloudStorage } from './impl/CloudStorage';

let queue: any;

function initStorage<T>(): Storage<T> {
  const vars = getEnv();

  if (vars.ENVIRONMENT === Environment.STAGING) {
    return new CloudStorage(vars.AWS_ENDPOINT, vars.AWS_QUEUE_URL);
  }

  return new StubStorage<T>();
}

export function getStorage<T>(): Storage<T> {
  if (queue === undefined) queue = initStorage<T>();
  return queue;
}
