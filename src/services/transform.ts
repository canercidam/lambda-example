import { is2xx, is5xx } from '../common/status';
import { getStorage } from '../storage/init';
import { Context, Data } from './data';

interface Event {
  Records: { body: string }[];
}

export async function handler(event: Event, context: Context): Promise<boolean> {
  const storage = getStorage();

  let allMsgs = '';

  event.Records.forEach((record) => {
    const data = JSON.parse(record.body) as Data;
    allMsgs += `${data.time} - ${data.id}: ${data.message}\n`;
  });

  const { statusCode, body } = await storage.put(context.awsRequestId, allMsgs);
  if (!is2xx(statusCode)) {
    console.warn(`failed to put: ${body}`);
    if (is5xx(statusCode)) throw new Error('failed to put');
    // Let 4xx slide here because it's not a temporary error.
  }

  // 2xx, 4xx
  return Promise.resolve(true);
}
