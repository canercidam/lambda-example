import { expect } from 'chai';
import { handler } from '../src/services/read';
import { Status } from '../src/common/status';

const testMessage = 'test-message';
const testId = 'test-id';

describe('read service tests', () => {
  it('should enqueue received messages', async () => {
    const result = await handler({ body: `{"message":"${testMessage}"}` }, { awsRequestId: testId });
    expect(result.statusCode).to.equal(Status.OK, result.body);
  });
});
