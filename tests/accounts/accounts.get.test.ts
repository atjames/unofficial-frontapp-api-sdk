import { expect, setupClient, hasApiToken, TEST_TIMEOUT } from '../setup';
import { FrontClient } from '../../src/index';

describe('Accounts API - get()', function() {
  this.timeout(TEST_TIMEOUT);
  
  let client: FrontClient;

  before(function() {
    if (!hasApiToken()) {
      this.skip();
    }
    
    client = setupClient();
  });

  it('should get a specific account by ID', async function() {
    // First get an account ID to work with
    const accountsList = await client.accounts.list({ limit: 1 });
    
    if (accountsList._results.length === 0) {
      this.skip(); // Skip if no accounts available
    }

    const accountId = accountsList._results[0].id;
    const account = await client.accounts.get(accountId);
    
    expect(account).to.have.property('id', accountId);
    expect(account).to.have.property('name');
    
    console.log(`✅ Retrieved account: ${account.name} (ID: ${account.id})`);
  });
}); 