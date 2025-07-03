export type ListAccountsParams = {
  limit?: number;
  page_token?: string;
  sort_by?: 'created_at' | 'updated_at';
  sort_order?: 'asc' | 'desc';
};

export type CreateAccountParams = {
  name: string;
  description?: string;
  custom_fields?: Record<string, any>;
};
