import {ReactQueryConfig} from '../../types/reactQueryConfig';
import {ApiClient, ApiGuestClient} from './apiClient';

export interface IUseAPI extends ReactQueryConfig {
  requestBody?: unknown;
  queryParams?: object;
}

export const triggerAPI = async <T>(config: IUseAPI): Promise<T> => {
  const {
    url,
    method,
    isMockEnabled,
    mockResponse,
    mockLoading,
    mockError,
    mockErrorResponse,
    useApiGuestClient,
    queryParams,
    customHeaders,
    requestBody,
  } = config;

  // ApiGuestClient can be used for API that don't need auth
  const axiosClient = useApiGuestClient ? ApiGuestClient : ApiClient;

  if (isMockEnabled) {
    // Simulate loading for mock data
    if (mockLoading) {
      return new Promise(resolve => {
        setTimeout(() => resolve(mockResponse as T), 5000);
      });
    }

    // Simulate error for mock data
    if (mockError) {
      if (mockErrorResponse) {
        const error = new Error('Mock error occurred') as Error & {
          response: typeof mockErrorResponse;
        };
        error.response = mockErrorResponse;
        return Promise.reject(error);
      }
      return Promise.reject(new Error('Mock error occurred'));
    }

    // Return a promise that resolves with mock data immediately
    return Promise.resolve(mockResponse as T);
  }
  // Return the actual query function using axios
  const res = await axiosClient.request<T>({
    method,
    url,
    params: queryParams,
    headers: {...customHeaders},
    data: requestBody,
  });

  return res.data;
};
