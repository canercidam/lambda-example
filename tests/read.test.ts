import { expect } from 'chai';
import { handler } from '../src/services/read';
import { Status } from '../src/common/response';

const testMessage = 'test-message';
const testId = 'test-id';

describe('read service tests', () => {
  it('should enqueue received messages', async () => {
    const result = await handler({ body: `{"message":"${testMessage}"}` }, { awsRequestId: testId });
    expect(result.status).to.equal(Status.Success, result.errorCode);
  });
});
