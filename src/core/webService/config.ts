const queryKeys = {
  persist: ['persist'], // query key is getting added in the API call for persisting the data
  category: ['category'],
  categories: () => [...queryKeys.category, 'list'],
};

// HTTP status code
export const HTTP_STATUS_OK = 200;
export const HTTP_STATUS_CREATED = 201;
export const HTTP_STATUS_BAD_REQUEST = 400;
export const HTTP_STATUS_UNAUTHORIZED = 401;
export const HTTP_STATUS_NOT_FOUND = 404;
export const HTTP_STATUS_RESOURCE_CONFLICT = 409;
export const HTTP_STATUS_EXPIRED = 410;
export const HTTP_STATUS_TOO_MANY_REQUESTS = 429;
export const HTTP_STATUS_FORBIDDEN = 403;
export const HTTP_INTERNAL_SERVER_ERROR = 500;

const defaultOptions = {
  enabled: true,
  customHeaders: null,
  params: null,
  isMockEnabled: false,
  mockLoading: false,
  mockError: false,
  isOffline: false,
  useApiGuestClient: false,
  shouldPersist: false,
  method: 'GET',
};

const apiConfig = {
  categories: {
    ...defaultOptions,
    url: 'categories/',
    queryKey: queryKeys.categories(),
    description: 'Fetches list of categories',
  },
};

export {queryKeys, apiConfig};
