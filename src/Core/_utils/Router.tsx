import { FC, ReactElement } from 'react';
import { RouteObject } from 'react-router-dom';

import { breadcrumbsLoader, ContentLayout } from 'Application/main';

import { RawMenuItem, RawRouterItem } from 'Core/interface';

import { post } from './Fetch';

export function fetchRouterData(): Promise<RawRouterItem[]> {
    return post<RawRouterItem[]>('Navigation.GetRouterData').then(({ data }) => data);
}

export function processRouterData(
    rawRouterItems: RawRouterItem[],
    loadedComponents: Record<string, ReactElement>,
    icons: Record<string, FC>
): RouteObject[] {
    return rawRouterItems.map(
        ({ key, component }) => ({
            path: `/${key}`,
            lazy: async () => ({
                loader: breadcrumbsLoader.bind(undefined, icons),
                element: <ContentLayout>
                    {loadedComponents[component]}
                </ContentLayout>
            })
        })
    );
}

export function fetchMenuData(): Promise<RawMenuItem[]> {
    return post<RawMenuItem[]>('Navigation.GetMenuNavigationData').then(({ data }) => data);
}
