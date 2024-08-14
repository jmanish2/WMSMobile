import {
  useQuery as useReactFetchQuery,
  useMutation as useReactMutationQuery,
} from '@tanstack/react-query';
import {
  ReactQueryGetConfig,
  ReactQueryMutationConfig,
} from '../../types/reactQueryConfig';
import {triggerAPI} from './triggerApi';
import {queryKeys} from './config';

export const useQuery = <T>(config: ReactQueryGetConfig<T>) => {
  const {method = 'GET', url} = config;
  const updatedQueryKey = generateQueryKey(config);
  const queryFn = () => triggerAPI<T>({...config, method});
  return useReactFetchQuery({...config, queryFn, queryKey: updatedQueryKey});
};

export const useMutation = <T>(config: ReactQueryMutationConfig<T>) => {
  const {method = 'POST', url} = config;
  const mutationFn = (requestBody: unknown = null) =>
    triggerAPI<T>({...config, requestBody, method});
  return useReactMutationQuery({...config, mutationFn});
};

export const generateQueryKey = <T>(config: ReactQueryGetConfig<T>) => {
  const {queryKey, queryParams, shouldPersist} = config;
  const keyParts = shouldPersist
    ? [...queryKeys.persist, ...queryKey]
    : [...queryKey];

  if (queryParams) {
    const sortedParams = Object.entries(queryParams).sort();
    sortedParams.forEach(([paramName, paramValue]) => {
      if (paramValue !== undefined && paramValue !== null) {
        keyParts.push(paramName, paramValue.toString());
      }
    });
  }

  return keyParts;
};

// Usage examples:

// Using useQuery
// const { data, error, isLoading } = useQuery(apiConfig.categories);

// Using useMutation
// const mutation = useMutation({
//   ...apiConfig.createCategory,
//   onSuccess: (data) => {
//     console.log('Category created!', data);
//   },
//   onError: (error) => {
//     console.error('Creation failed!', error);
//   },
// });
