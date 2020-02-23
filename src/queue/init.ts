import AWS from 'aws-sdk';
import { Queue } from './Queue';
import { StubQueue } from './impl/StubQueue';
import { Environment, getEnv, getEndpoint } from '../common/env';
import { CloudQueue } from './impl/CloudQueue';

let queue: any;

function initQueue<T>(): Queue<T> {
  const vars = getEnv();

  if (vars.ENVIRONMENT === Environment.STAGING) {
    AWS.config.update({ region: vars.AWS_DEFAULT_REGION });
    return new CloudQueue(getEndpoint('sqs'), vars.AWS_QUEUE_URL);
  }

  return new StubQueue<T>();
}

export function getQueue<T>(): Queue<T> {
  if (queue === undefined) queue = initQueue<T>();
  return queue;
}
