import { createRequest, Config } from '../request';

export class ConversationsAPI {
  private request: ReturnType<typeof createRequest>;

  constructor(config: Config) {
    this.request = createRequest(config);
  }

  async get(conversationId: string) {
    return this.request(`/conversations/${conversationId}`);
  }

  async list() {
    return this.request(`/conversations`);
  }
}
