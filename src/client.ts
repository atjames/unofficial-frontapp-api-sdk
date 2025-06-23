import {ConversationsAPI} from './api/conversations';
import {AccountsAPI} from './api/accounts';
import {Config} from './request';

export class FrontClient {
  readonly conversations: ConversationsAPI;
  readonly accounts: AccountsAPI;

  constructor(apiToken: string) {
    const config: Config = {
      apiToken,
      baseUrl: 'https://api2.frontapp.com',
    };

    this.conversations = new ConversationsAPI(config);
    this.accounts = new AccountsAPI(config);
    // Add other resources here
  }
}
