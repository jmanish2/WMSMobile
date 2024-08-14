import {
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {ErrorResponse} from './api';

export interface ReactQueryConfig {
  url: string;
  method?: string;
  description: string;
  isMockEnabled?: boolean;
  mockResponse?: unknown;
  mockLoading?: boolean;
  mockError?: boolean;
  mockErrorResponse?: unknown;
  useApiGuestClient?: boolean;
  customHeaders?: object | null;
  queryParams?: object;
  shouldPersist?: boolean;
}

export interface ReactQueryGetConfig<
  TQueryFnData = unknown,
  TError = AxiosError<ErrorResponse>,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> extends ReactQueryConfig,
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> {}

export interface RequestPayloadItem {
  [key: string]: string | number | boolean;
}

type RequestPayload = RequestPayloadItem | object[] | number;

export interface ReactQueryMutationConfig<
  TData = unknown,
  TError = AxiosError<ErrorResponse>,
  TVariables = RequestPayload,
  TContext = unknown,
> extends ReactQueryConfig,
    UseMutationOptions<TData, TError, TVariables, TContext> {}

export interface ReactQueryUseInfiniteQueryConfig<
  TQueryFnData = unknown,
  TError = AxiosError<ErrorResponse>,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
> extends ReactQueryConfig,
    UseInfiniteQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryData,
      TQueryKey,
      TPageParam
    > {}

export interface IApiConfig {
  [key: string]:
    | ReactQueryConfig
    | ReactQueryGetConfig
    | ReactQueryUseInfiniteQueryConfig;
}

export interface Storage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}
