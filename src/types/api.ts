export type ErrorMessage<T> = {
  key: T;
  message: string;
};

export type ErrorResponse = {
  detail?: string;
  message?: string;
  error?: string;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
