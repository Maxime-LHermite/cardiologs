import React, { ReactElement, useMemo } from 'react';
import { createSearchParams, useParams, useSearchParams } from 'react-router-dom';
import { generatePath, useRoutes } from 'react-router';
import { type History } from 'history';
import { NotFound } from '@app/pages/NotFound';
import { ZodSchema } from 'zod';

type _ParsePath<Path extends string> =
    // split path into individual path segments
    Path extends `${infer L}/${infer R}`
        ? _ParsePath<L> | _ParsePath<R>
        : // find params after `:`
          Path extends `${string}:${infer Param}`
          ? Param
          : // otherwise, there aren't any params present
            never;

type ParsePath<Path extends string> =
    // check if path is just a wildcard
    Path extends '*'
        ? '*'
        : // look for wildcard at the end of the path
          Path extends `${infer Rest}/*`
          ? '*' | _ParsePath<Rest>
          : // look for params in the absence of wildcards
            _ParsePath<Path>;

type Params<Path extends string> = {
    [key in ParsePath<Path>]: string;
};

type PathParams<Path extends string> = keyof Params<Path> extends undefined ? undefined : Params<Path>;

type PathListParams<PathList> = {
    [Path in keyof PathList]: Path extends string ? PathParams<Path> : never;
};

/**
 * Parses the path and creates a type to define the renderings for each path
 * Supported paths:
 * - /path
 * - /path/:param
 * - /path/*
 * - /path/:param/*
 * - ''
 * - 404
 * - *
 * @param PathList an object with the paths as keys and the params as values
 */
export type PathRenderers<PathList> = {
    [Path in keyof PathList]: PathList[Path] extends undefined
        ? { render: React.ReactNode }
        : {
              schema: ZodSchema<PathList[Path]>;
              render: (params: PathList[Path]) => React.ReactNode;
          };
};

type AppRouteRendererProps<PathList> = {
    renderer: PathRenderers<PathList>[keyof PathList];
    noFoundRenderer: React.ReactNode;
    history: History;
};

const getFragment = (fragment: string): Record<string, unknown> => {
    try {
        return JSON.parse(fragment.substring(1));
    } catch (e) {
        return {};
    }
};

const concatenatePath = (path: string, searchParams?: Record<string, unknown>, fragment?: unknown): string => {
    const params = searchParams
        ? createSearchParams(
              Object.entries(searchParams).reduce(
                  (acc, [key, value]) => {
                      if (value) {
                          acc.push([key, value.toString()]);
                      }
                      return acc;
                  },
                  [] as [string, string][]
              )
          )
        : undefined;

    const fragmentBase64 = fragment ? atob(JSON.stringify(fragment)) : undefined;

    return `${path}${params ? `?${params}` : ''}${fragment}${fragmentBase64 ? `#${fragmentBase64}` : ''}`;
};

const AppRouteRenderer = <PathList,>({ renderer, noFoundRenderer, history }: AppRouteRendererProps<PathList>): ReactElement => {
    if ('schema' in renderer) {
        const params = useParams();
        const searchParams = Object.fromEntries(useSearchParams()[0].entries());
        const fragment = getFragment(history.location.hash);
        const parsedParams = renderer.schema.safeParse({
            ...fragment,
            ...searchParams,
            ...params,
        });
        if (parsedParams.success) {
            return <>{renderer.render(parsedParams.data)}</>;
        } else {
            return <>{noFoundRenderer}</>;
        }
    } else {
        return <>{renderer.render}</>;
    }
};

type AppRoutesProps<PathList> = {
    pathRenderers: PathRenderers<PathList>;
    history: History;
};

export const AppRoutes = <PathList,>({ pathRenderers, history }: AppRoutesProps<PathList>) => {
    useParams();
    const routesObject = useMemo(
        () =>
            Object.entries(pathRenderers).map(([key, renderer]) => ({
                path: key as string,
                element: <AppRouteRenderer<PathList> renderer={renderer} noFoundRenderer={<NotFound />} history={history} />,
            })),
        []
    );
    return useRoutes(routesObject);
};

export const route = <PathList, K extends keyof PathList>(
    path: K,
    params: PathListParams<PathList>[K],
    query?: Partial<PathList[K]>,
    fragment?: Partial<PathList[K]>
): string => {
    return concatenatePath(generatePath(path as string, params), query, fragment);
};
