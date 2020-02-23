import {
  ServiceResponse, Status, success,
} from '../common/response';
import { getStorage } from '../storage/init';
import { Context, Data } from './data';

interface Event {
  Records: { body: string }[];
}

export async function handler(event: Event, context: Context): Promise<ServiceResponse> {
  const storage = getStorage<string>();

  let allMsgs = '';

  event.Records.forEach((record) => {
    const data = JSON.parse(record.body) as Data;
    allMsgs += `${data.time} - ${data.id}: ${data.message}\n`;
  });

  const result = await storage.put(context.awsRequestId, allMsgs);
  if (result.status === Status.Failure) {
    throw new Error(result.data);
  }

  return success();
}
