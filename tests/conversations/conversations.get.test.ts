import { expect, setupClient, hasApiToken, TEST_TIMEOUT } from '../setup';
import { FrontClient } from '../../src/index';

describe('Conversations API - get()', function() {
  this.timeout(TEST_TIMEOUT);
  
  let client: FrontClient;

  before(function() {
    if (!hasApiToken()) {
      this.skip();
    }
    
    client = setupClient();
  });

  it('should get a specific conversation by ID', async function() {
    // First get a conversation ID to work with
    const conversationsList: any = await client.conversations.list();
    const conversations = conversationsList._results || conversationsList;

    if (!Array.isArray(conversations) || conversations.length === 0) {
      this.skip(); // Skip if no conversations available
    }

    const conversationId = conversations[0].id;
    const conversation: any = await client.conversations.get(conversationId);
    
    expect(conversation).to.have.property('id', conversationId);
    
    console.log(`✅ Retrieved conversation: ${conversation.subject || conversation.id}`);
  });
}); 