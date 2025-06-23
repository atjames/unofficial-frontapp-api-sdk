export type ListAccountsParams = {
  limit?: number;
  page_token?: string;
  sort_by?: 'created_at' | 'updated_at';
  sort_order?: 'asc' | 'desc';
};

export type CreateAccountPayload = {
  name: string;
  description?: string;
  custom_fields?: Record<string, any>;
};


export type PaginatedResponse<T> = {
  _results: T[];
  _pagination: {
    next?: string;
  };
};