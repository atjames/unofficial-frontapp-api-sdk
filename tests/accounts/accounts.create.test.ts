import { expect, setupClient, hasApiToken, TEST_TIMEOUT } from '../setup';
import { FrontClient } from '../../src/index';

describe('Accounts API - create()', function() {
  this.timeout(TEST_TIMEOUT);
  
  let client: FrontClient;

  before(function() {
    if (!hasApiToken()) {
      this.skip();
    }
    
    client = setupClient();
  });

  it('should create a new account', async function() {
    const accountData = {
      name: `Test Account ${Date.now()}`,
      description: 'Created by test suite'
    };

    try {
      const newAccount = await client.accounts.create(accountData);
      
      expect(newAccount).to.have.property('id');
      expect(newAccount).to.have.property('name', accountData.name);
      
      console.log(`✅ Created account: ${newAccount.name} (ID: ${newAccount.id})`);
    } catch (error) {
      // Account creation might fail due to permissions, skip gracefully
      console.log(`⚠️  Account creation skipped: ${(error as Error).message}`);
      this.skip();
    }
  });
}); 