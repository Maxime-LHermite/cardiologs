//////////////////////////////////////////////////////////////////
////                      QUERIES                             ////
//////////////////////////////////////////////////////////////////

import { NetworkMode, NotifyOnChangeProps, QueryFunctionContext, UseQueryOptions } from '@tanstack/react-query';
import { ApiErrorResponse } from '@app/models/ApiErrorResponse';

type RetryValue<TError> = boolean | number | ShouldRetryFunction<TError>;
type ShouldRetryFunction<TError> = (failureCount: number, error: TError) => boolean;
type RetryDelayValue<TError> = number | RetryDelayFunction<TError>;
type RetryDelayFunction<TError> = (failureCount: number, error: TError) => number;

export type QueryBaseOptions = {
    networkMode?: NetworkMode;
    retry?: RetryValue<ApiErrorResponse>;
    retryOnMount?: boolean;
    retryDelay?: RetryDelayValue<ApiErrorResponse>;
    staleTime?: number;
    gcTime?: number;
    refetchInterval?: number | false;
    refetchIntervalInBackground?: boolean;
    refetchOnMount?: boolean | 'always';
    refetchOnReconnect?: boolean | 'always';
    refetchOnWindowFocus?: boolean | 'always';
};

type DefinedVariable = number | string | boolean | object | symbol | bigint;

type QueryFnWithParameter<FnReturn, Parameter extends DefinedVariable> = (
    variables: Parameter,
    context: QueryFunctionContext
) => FnReturn | Promise<FnReturn>;

type QueryOptionsWithVariables<FnReturn, Parameter extends DefinedVariable> = QueryBaseOptions & {
    queryKey: (param: Parameter) => string[];
    queryFn: QueryFnWithParameter<FnReturn, Parameter>;
};

type QueryHookOptions<FnReturn, FnTransform, Parameter extends DefinedVariable> = QueryBaseOptions & {
    enabled?: boolean;
    notifyOnChangeProps?: NotifyOnChangeProps;
};

/**
 *     -- queryKey,
 *     -- queryFn,
 *     ++ enabled,
 *     oo networkMode,
 *     oo retry,
 *     oo retryOnMount,
 *     oo retryDelay,
 *     oo staleTime,
 *     oo gcTime,
 *     xx queryKeyHashFn,
 *     oo refetchInterval,
 *     oo refetchIntervalInBackground,
 *     oo refetchOnMount,
 *     oo refetchOnReconnect,
 *     oo refetchOnWindowFocus,
 *     ++ notifyOnChangeProps,
 *     ++ select,
 *     ++ initialData,
 *     ++ initialDataUpdatedAt,
 *     ++ placeholderData,
 *     xx structuralSharing,
 *     xx throwOnError,
 *     xx meta,
 */
type QueryOptions = {
    staleTime?: number;
    gcTime?: number;
    refetchInterval?: number | false;
    refetchIntervalInBackground?: boolean;
    refetchOnWindowFocus?: boolean | 'always';
    refetchOnReconnect?: boolean | 'always';
    refetchOnMount?: boolean | 'always';
    retryOnMount?: boolean;
    notifyOnChangeProps?: NotifyOnChangeProps;
    throwOnError?: boolean;
    suspense?: boolean;
    retry?: boolean | number | ((failureCount: number, error: ApiErrorResponse) => boolean);
    retryDelay?: number | ((failureCount: number, error: ApiErrorResponse) => number);
    networkMode?: NetworkMode;
    initialDataUpdatedAt?: number | (() => number | undefined);
    structuralSharing?: boolean | (<T>(oldData: T | undefined, newData: T) => T);
    maxPages?: number;
};

type UseQueryOptionsOverride<TFnData, TData> = Omit<UseQueryOptions<TFnData, ApiErrorResponse, TData>, 'queryKey' | 'queryFn'>;

type GetQueryKeyWithVariables<TVariables extends VariablesDefined> = (variables: TVariables) => string[];
type UseQueryOptionsWithVariables<TFnData, TVariables extends VariablesDefined> = QueryOptions & {
    queryKey: GetQueryKeyWithVariables<TVariables>;
    queryFn: QueryFnWithVariables<TFnData, TVariables>;
};
type UseQueryResultWithVariables<TFnData, TVariables extends VariablesDefined> = {
    <TFnDataTransform = TFnData>(
        variables: TVariables,
        options?: UseQueryOptionsOverride<TFnData, TFnDataTransform>
    ): UseQueryResult<TFnDataTransform, ApiErrorResponse>;
    getQueryKey: GetQueryKeyWithVariables<TVariables>;
};

const createAppQueryWithVariables = <TFnData, TVariables extends VariablesDefined>(
    options: UseQueryOptionsWithVariables<TFnData, TVariables>
): UseQueryResultWithVariables<TFnData, TVariables> => {
    const useCustomQuery: UseQueryResultWithVariables<TFnData, TVariables> = <TFnDataTransform = TFnData>(
        variables: TVariables,
        overrideOpts?: UseQueryOptionsOverride<TFnData, TFnDataTransform>
    ) =>
        useQuery<TFnData, ApiErrorResponse, TFnDataTransform>(
            {
                ...options,
                queryKey: options.queryKey(variables),
                queryFn: (context) => options.queryFn(variables, context),
                ...overrideOpts,
            },
            queryClient
        );

    useCustomQuery.getQueryKey = (variables: TVariables) => options.queryKey(variables);

    return useCustomQuery;
};

type GetQueryKeyNoVariables = () => string[];
type UseQueryOptionsNoVariables<TFnData> = {
    queryKey: string;
    queryFn: QueryFunction<TFnData>;
} & QueryOptions;

type UseQueryResultNoVariables<TFnData> = {
    <TFnDataTransform = TFnData>(options?: UseQueryOptionsOverride<TFnData, TFnDataTransform>): UseQueryResult<TFnDataTransform, ApiErrorResponse>;
    getQueryKey: GetQueryKeyNoVariables;
};

const createAppQueryNoVariables = <TFnData>(options: UseQueryOptionsNoVariables<TFnData>): UseQueryResultNoVariables<TFnData> => {
    const useCustomQuery: UseQueryResultNoVariables<TFnData> = <TFnDataTransform = TFnData>(
        overrideOpts?: UseQueryOptionsOverride<TFnData, TFnDataTransform>
    ) =>
        useQuery<TFnData, ApiErrorResponse, TFnDataTransform>(
            {
                ...options,
                queryKey: [options.queryKey],
                ...overrideOpts,
            },
            queryClient
        );

    useCustomQuery.getQueryKey = () => [options.queryKey];

    return useCustomQuery;
};

type CreateAppQueryType<TFnData, TVariables> = TVariables extends VariablesDefined
    ? {
          options: UseQueryOptionsWithVariables<TFnData, TVariables>;
          ret: UseQueryResultWithVariables<TFnData, TVariables>;
      }
    : {
          options: UseQueryOptionsNoVariables<TFnData>;
          ret: UseQueryResultNoVariables<TFnData>;
      };
export const createAppQuery = <
    TFnData,
    TVariables = undefined,
    Type extends CreateAppQueryType<TFnData, TVariables> = CreateAppQueryType<TFnData, TVariables>,
>(
    options: Type['options']
): Type['ret'] => {
    if (typeof options.queryKey === 'string') {
        return createAppQueryNoVariables(options as UseQueryOptionsNoVariables<TFnData>) as Type['ret'];
    } else {
        return createAppQueryWithVariables(options as UseQueryOptionsWithVariables<TFnData, number>) as Type['ret'];
    }
};

//////////////////////////////////////////////////////////////////
////                   MUTATIONS                              ////
//////////////////////////////////////////////////////////////////

type UseMutationOptionsOverride<TData, TVariables, TContext> = Omit<UseMutationOptions<TData, ApiErrorResponse, TVariables, TContext>, 'mutationFn'>;
type UseMutationResultCustom<TData, TVariables, TContext> = (
    options?: UseMutationOptionsOverride<TData, TVariables, TContext>
) => UseMutationResult<TData, ApiErrorResponse, TVariables, TContext>;

export const createAppMutation = <TData, TVariables, TContext = unknown>({
    onSuccess,
    onMutate,
    onError,
    onSettled,
    ...options
}: UseMutationOptions<TData, ApiErrorResponse, TVariables, TContext>): UseMutationResultCustom<TData, TVariables, TContext> => {
    return (overrideOpts) => {
        let opts: {};
        if (!overrideOpts) {
            opts = { onSuccess, onMutate, onError, onSettled, ...options };
        } else {
            const {
                onSuccess: otherOnSuccess,
                onMutate: otherOnMutate,
                onError: otherOnError,
                onSettled: otherOnSettled,
                ...overrideRestOpts
            } = overrideOpts;
            opts = {
                ...options,
                ...overrideRestOpts,
                onSuccess: (data: TData, variables: TVariables, context: TContext) => {
                    onSuccess && onSuccess(data, variables, context);
                    otherOnSuccess && otherOnSuccess(data, variables, context);
                },
                onMutate: (variables: TVariables) => {
                    onMutate && onMutate(variables);
                    otherOnMutate && otherOnMutate(variables);
                },
                onError: (error: ApiErrorResponse, variables: TVariables, context: TContext) => {
                    onError && onError(error, variables, context);
                    otherOnError && otherOnError(error, variables, context);
                },
                onSettled: (data: TData | undefined, error: ApiErrorResponse | null, variables: TVariables, context: TContext) => {
                    onSettled && onSettled(data, error, variables, context);
                    otherOnSettled && otherOnSettled(data, error, variables, context);
                },
            };
        }
        return useMutation<TData, ApiErrorResponse, TVariables, TContext>(opts, queryClient);
    };
};

//////////////////////////////////////////////////////////////////
////                   INFINITE QUERIES                       ////
//////////////////////////////////////////////////////////////////

type InfiniteQueryFn<TFnData, TQueryKey extends QueryKey, TVariables extends VariablesDefined> = (
    variables: TVariables,
    context: QueryFunctionContext<TQueryKey, TVariables>
) => TFnData | Promise<TFnData>;

type InfiniteQueryOptions<TFnData, TPageParam extends VariablesDefined> = {
    getPreviousPageParam?: (
        firstPage: TFnData,
        allPages: Array<TFnData>,
        firstPageParam: TPageParam,
        allPageParams: Array<TPageParam>
    ) => TPageParam | undefined | null;
    getNextPageParam: (
        lastPage: TFnData,
        allPages: Array<TFnData>,
        lastPageParam: TPageParam,
        allPageParams: Array<TPageParam>
    ) => TPageParam | undefined | null;
    maxPages: number | undefined;
    queryKey: GetQueryKeyWithVariables<TPageParam>;
    queryFn: InfiniteQueryFn<TFnData, string[], TPageParam>;
} & QueryOptions;

type UseInfiniteQueryOptionsOverride<TFnData, TData, TQueryKey extends QueryKey, TVariables> = Omit<
    UseInfiniteQueryOptions<TFnData, ApiErrorResponse, TData, TFnData, TQueryKey, TVariables>,
    'queryKey' | 'queryFn' | 'initialPageParam'
>;

type UseCustomInfiniteQueryResult<TFnData, TQueryKey extends QueryKey, TVariables extends VariablesDefined> = {
    <TFnDataTransform = InfiniteData<TFnData, TVariables>>(
        variables: TVariables,
        options?: UseInfiniteQueryOptionsOverride<TFnData, TFnDataTransform, TQueryKey, TVariables>
    ): UseInfiniteQueryResult<TFnDataTransform, ApiErrorResponse>;
    getQueryKey: GetQueryKeyWithVariables<TVariables>;
};

export const createInfiniteAppQuery = <TFnData, TVariables extends VariablesDefined>(
    options: InfiniteQueryOptions<TFnData, TVariables>
): UseCustomInfiniteQueryResult<TFnData, string[], TVariables> => {
    const useCustomQuery: UseCustomInfiniteQueryResult<TFnData, string[], TVariables> = <TData = TFnData>(
        variables: TVariables,
        overrideOpts?: UseInfiniteQueryOptionsOverride<TFnData, TData, string[], TVariables>
    ) =>
        useInfiniteQuery<TFnData, ApiErrorResponse, TData, string[], TVariables>(
            {
                ...options,
                queryKey: options.queryKey(variables),
                queryFn: (context) => ('pageParam' in context ? options.queryFn(context.pageParam, context) : options.queryFn(variables, context)),
                ...overrideOpts,
                initialPageParam: variables,
            },
            queryClient
        );
    useCustomQuery.getQueryKey = (variables: TVariables) => options.queryKey(variables);

    return useCustomQuery;
};
