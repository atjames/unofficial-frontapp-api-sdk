import { expect, setupClient, hasApiToken, TEST_TIMEOUT } from '../setup';
import { FrontClient } from '../../src/index';

describe('Front API Client', function() {
  this.timeout(TEST_TIMEOUT);
  
  let client: FrontClient;

  before(function() {
    if (!hasApiToken()) {
      this.skip(); // Skip all tests if no API token
    }
    
    client = setupClient();
  });

  it('should create a FrontClient instance', function() {
    expect(client).to.be.instanceOf(FrontClient);
    expect(client.accounts).to.exist;
    expect(client.conversations).to.exist;
  });

  it('should have accounts API methods', function() {
    expect(client.accounts.get).to.be.a('function');
    expect(client.accounts.list).to.be.a('function');
    expect(client.accounts.listAll).to.be.a('function');
    expect(client.accounts.create).to.be.a('function');
  });

  it('should have conversations API methods', function() {
    expect(client.conversations.get).to.be.a('function');
    expect(client.conversations.list).to.be.a('function');
  });
}); 