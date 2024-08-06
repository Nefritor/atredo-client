import { FC, ReactElement } from 'react';

import { RawRouterItem } from 'Core/interface';
import { ErrorContent } from './View';

export function getLoadedComponents(rawRouterData: RawRouterItem[]): Promise<Record<string, ReactElement>> {
    const components = rawRouterData.map((item) => item.component)
        .reduce((acc, component) => {
            if (!acc.includes(component)) {
                acc.push(component);
            }
            return acc;
        }, [] as string[]);
    return Promise.all(
        components.map(
            (component) =>
                import(`../../${component}`)
                    .then(({ View }) => ({
                        name: component,
                        component: <View/>
                    }))
                    .catch((error) => ({
                        name: component,
                        component: <ErrorContent message={error.message}/>
                    }))
        )
    ).then((loadedComponent) => {
        return loadedComponent.reduce((acc, { name, component }) => {
            acc[name] = component;
            return acc;
        }, {} as Record<string, ReactElement>);
    });
}

export function getLoadedIconsLib(): Promise<Record<string, FC>> {
    // @ts-ignore
    return import('@ant-design/icons');
}
