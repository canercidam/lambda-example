import {
  ErrorCode, ServiceResponse, failure, Status, success,
} from '../common/response';
import { getQueue } from '../queue/init';
import { logFormat } from '../common/log';
import { Context, Data } from './data';

interface Event {
  body?: string;
}

export async function handler(event: Event, context: Context): Promise<ServiceResponse> {
  if (event.body === undefined) return failure(ErrorCode.EMPTY_BODY);

  const body: { message?: string } = JSON.parse(event.body);
  if (body.message === undefined) return failure(ErrorCode.MISSING_MESSAGE);

  const result = await getQueue<Data>().enqueue({
    id: context.awsRequestId,
    time: Date.now(),
    message: body.message,
  });
  if (result.status === Status.Failure) {
    console.log(logFormat('failed to enqueue', result));
    return failure(ErrorCode.FAILED, context.awsRequestId);
  }

  return success();
}
