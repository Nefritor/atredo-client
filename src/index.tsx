import { createElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { MenuProps } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import { View as HomeView } from 'Application/home';
import {
    breadcrumbsLoader,
    ContentLayout,
    getLoadedComponents,
    getLoadedIconsLib,
    IconsContext,
    MainLayout,
    MenuContext
} from 'Application/main';
import { Main as MainSkeleton } from 'Application/skeleton';
import { fetchMenuData, fetchRouterData, processRouterData } from 'Core/utils';

import './index.css';

async function getBrowserRouter() {
    const [ rawRouterData, rawMenuData, icons ] =
        await Promise.all([ fetchRouterData(), fetchMenuData(), getLoadedIconsLib() ]);

    const loadedComponents = await getLoadedComponents(rawRouterData);

    const menu = [
        {
            key: 'home',
            label: 'Home',
            path: '/',
            icon: <HomeOutlined/>
        },
        ...rawMenuData.map((data) => {
            if (data.icon) {
                return { ...data, icon: createElement(icons[data.icon]) };
            }
            return { ...data };
        })
    ] as MenuProps['items'];

    return createBrowserRouter([
        {
            path: "/",
            element: <IconsContext.Provider value={icons}>
                <MenuContext.Provider value={menu}>
                    <MainLayout headerTitle="ATREDO" bodyContent={<Outlet/>}/>
                </MenuContext.Provider>
            </IconsContext.Provider>,
            children: [
                {
                    index: true,
                    loader: breadcrumbsLoader.bind(undefined, icons),
                    element: <ContentLayout><HomeView/></ContentLayout>,
                },
                ...processRouterData(rawRouterData, loadedComponents, icons)
            ]
        },
    ]);
}

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<MainSkeleton/>);

getBrowserRouter().then(
    (browserRouter) => {
        root.render(
            <StrictMode>
                <RouterProvider router={browserRouter}
                                fallbackElement={<MainSkeleton/>}/>
            </StrictMode>
        );
    }
);
