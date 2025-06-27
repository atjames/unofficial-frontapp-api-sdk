import { expect, setupClient, hasApiToken, TEST_TIMEOUT } from '../setup';
import { FrontClient } from '../../src/index';

describe('Accounts API - listAll()', function() {
  this.timeout(TEST_TIMEOUT);
  
  let client: FrontClient;

  before(function() {
    if (!hasApiToken()) {
      this.skip();
    }
    
    client = setupClient();
  });

  it('should retrieve all accounts with automatic pagination', async function() {
    const allAccounts = await client.accounts.listAll();
    
    expect(allAccounts).to.be.an('array');
    
    console.log(`✅ Retrieved ${allAccounts.length} total accounts via listAll()`);
  });
}); 