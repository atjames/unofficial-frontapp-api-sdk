import { 
  expect, 
  setupClient, 
  hasApiToken, 
  TEST_TIMEOUT
} from '../setup';
import { FrontClient } from '../../src/index';

describe('Integration Tests', function() {
  this.timeout(TEST_TIMEOUT);
  
  let client: FrontClient;

  before(function() {
    if (!hasApiToken()) {
      this.skip(); // Skip all tests if no API token
    }
    
    client = setupClient();
  });

  it('should perform basic workflow: list accounts and conversations', async function() {
    // Test basic workflow
    const accounts = await client.accounts.list();
    expect(accounts).to.have.property('_results');
    
    const conversations: any = await client.conversations.list();
    const conversationsList = conversations._results || conversations;
    expect(conversationsList).to.be.an('array');
    
    console.log(`✅ Workflow completed: ${accounts._results.length} accounts, ${conversationsList.length} conversations`);
  });

  it('should handle account retrieval if accounts exist', async function() {
    const accounts = await client.accounts.list();
    
    if (accounts._results.length > 0) {
      const firstAccount = await client.accounts.get(accounts._results[0].id);
      expect(firstAccount).to.have.property('id', accounts._results[0].id);
      console.log(`✅ Successfully retrieved account: ${firstAccount.name}`);
    } else {
      console.log('ℹ️  No accounts available for retrieval test');
    }
  });
}); 