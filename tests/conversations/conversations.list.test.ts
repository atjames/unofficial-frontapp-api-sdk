import { expect, setupClient, hasApiToken, TEST_TIMEOUT } from '../setup';
import { FrontClient } from '../../src/index';

describe('Conversations API - list()', function() {
  this.timeout(TEST_TIMEOUT);
  
  let client: FrontClient;

  before(function() {
    if (!hasApiToken()) {
      this.skip();
    }
    
    client = setupClient();
  });

  it('should list conversations', async function() {
    const result: any = await client.conversations.list();
    
    // Handle different response formats
    const conversationsList = result._results || result;
    expect(conversationsList).to.be.an('array');
    
    console.log(`✅ Found ${conversationsList.length} conversations`);
  });
}); 