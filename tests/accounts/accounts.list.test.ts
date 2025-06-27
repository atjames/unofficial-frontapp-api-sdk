import { expect, setupClient, hasApiToken, TEST_TIMEOUT } from '../setup';
import { FrontClient } from '../../src/index';

describe('Accounts API - list()', function() {
  this.timeout(TEST_TIMEOUT);
  
  let client: FrontClient;

  before(function() {
    if (!hasApiToken()) {
      this.skip();
    }
    
    client = setupClient();
  });

  it('should list accounts', async function() {
    const result = await client.accounts.list();
    
    expect(result).to.have.property('_results');
    expect(result._results).to.be.an('array');
    expect(result).to.have.property('_pagination');
    
    console.log(`✅ Found ${result._results.length} accounts`);
  });

  it('should list accounts with limit parameter', async function() {
    const result = await client.accounts.list({ limit: 2 });
    
    expect(result).to.have.property('_results');
    expect(result._results).to.be.an('array');
    expect(result._results).to.have.length.at.most(2);
    
    console.log(`✅ Limited results to ${result._results.length} accounts`);
  });
}); 