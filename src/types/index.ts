export type PaginatedResponse<T> = {
  _results: T[];
  _pagination: {
    next?: string;
  };
};