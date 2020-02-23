import { createHash } from 'crypto';
import { expect } from 'chai';
import { handler } from '../src/services/transform';
import { Data } from '../src/services/data';
import { getStorage } from '../src/storage/init';

const testMessageObj: Data = {
  id: 'some-id',
  time: 123,
  message: 'hi!',
};
const testMessage = JSON.stringify(testMessageObj);
const testId = createHash('md5').update('some_string').digest('hex');

describe('transform service tests', () => {
  it('should transform and put enqueued messages', async () => {
    const result = await handler({ Records: [{ body: testMessage }] }, { awsRequestId: testId });
    expect(result).to.equal(true);

    const storage = getStorage();
    const data = await storage.get(testId);
    const dataStr = data.toString();
    expect(dataStr).to.include(testMessageObj.message);
    expect(dataStr).to.include(testMessageObj.time);
  });
});
