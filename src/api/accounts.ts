import { createRequest, Config } from '../request';
import { PaginatedResponse} from '../types';
import { ListAccountsParams, CreateAccountPayload } from '../types/Accounts/Account.types';

export class AccountsAPI {
  private request: ReturnType<typeof createRequest>;

  constructor(config: Config) {
    this.request = createRequest(config);
  }

  /**
   * Get a single account by its ID or resource alias.
   *
   * @param accountId - The Account ID. Alternatively, you can supply the resource alias.
   * @returns An account object.
   */
  async get(accountId: string): Promise<any> {
    return this.request(`/accounts/${accountId}`);
  }

  /**
   * List a single page of accounts with optional pagination.
   *
   * @param params - Optional query parameters:
   *  - `limit`: Max number of accounts to return (default 50, max 100)
   *  - `page_token`: Token to fetch the next page of results
   *  - `sort_by`: Field used to sort the accounts. Either created_at or updated_at.
   *  - `sort_order` : Order by which results should be sorted. Either asc or des. 
   * @returns A paginated list of account objects.
   */
  async list(params?: ListAccountsParams): Promise<PaginatedResponse<any>> {
    const query = params
      ? `?${new URLSearchParams(params as Record<string, string>)}`
      : '';
    return this.request(`/accounts${query}`);
  }

  /**
   * Automatically paginates through all accounts using the maximum page size.
   *
   * @returns A combined array of all account objects.
   */
  async listAll(): Promise<any[]> {
  const allAccounts: any[] = [];
  let pageToken: string | undefined = undefined;

  do {
    const params: ListAccountsParams = {
      limit: 100,
      ...(pageToken ? { page_token: pageToken } : {}),
    };

    console.log('Requesting with params:', params);

    const response = await this.list(params);

    allAccounts.push(...response._results);

    pageToken = response._pagination?.next; // ✅ This is the correct token to use
  } while (pageToken);

  return allAccounts;
}
   /**
   * Create a new account.
   *
   * @param payload - The account data to create.
   *  - `name`: Required name of the account.
   *  - `description`: Optional description.
   *  - `custom_fields`: Optional custom field values.
   * @returns The newly created account object.
   */
  async create(payload: CreateAccountPayload): Promise<any> {
    return this.request(`/accounts`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}
