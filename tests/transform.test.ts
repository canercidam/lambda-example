import { createHash } from 'crypto';
import { expect } from 'chai';
import { handler } from '../src/services/transform';
import { Status } from '../src/common/response';
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
    expect(result.status).to.equal(Status.Success, result.errorCode);

    const storage = getStorage<string>();
    const data = await storage.get(testId);
    expect(data).to.include(testMessageObj.message);
    expect(data).to.include(testMessageObj.time);
  });
});
