import {
  ErrorCode, ServiceResponse, badRequest, internalErr, ok, is2xx,
} from '../common/status';
import { getQueue } from '../queue/init';
import { Context, Data } from './data';

interface Event {
  body?: string;
}

export async function handler(event: Event, context: Context): Promise<ServiceResponse> {
  if (event.body === undefined) return badRequest(ErrorCode.EMPTY_BODY);

  const body: { message?: string } = JSON.parse(event.body);
  if (body.message === undefined) return badRequest(ErrorCode.MISSING_MESSAGE);

  const result = await getQueue<Data>().enqueue({
    id: context.awsRequestId,
    time: Date.now(),
    message: body.message,
  });
  if (!is2xx(result.statusCode)) {
    console.warn(`failed to enqueue: ${result.body}`);
    return internalErr(context.awsRequestId);
  }

  return ok();
}
