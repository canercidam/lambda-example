import AWS from 'aws-sdk';
import { Storage } from './Storage';
import { StubStorage } from './impl/StubStorage';
import { Environment, getEnv, getEndpoint } from '../common/env';
import { CloudStorage } from './impl/CloudStorage';

let queue: any;

function initStorage(): Storage<string> {
  const vars = getEnv();

  if (vars.ENVIRONMENT === Environment.STAGING) {
    AWS.config.update({ region: vars.AWS_DEFAULT_REGION });
    return new CloudStorage(getEndpoint('s3'), vars.AWS_BUCKET);
  }

  return new StubStorage<string>();
}

export function getStorage(): Storage<string> {
  if (queue === undefined) queue = initStorage();
  return queue;
}
