import { createElement, FC, ReactElement } from 'react';
import { LoaderFunctionArgs, Outlet, useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

import { BreadcrumbProps, MenuItemProps, Result, Space } from 'antd';

import { post } from 'Core/utils';

import { MainLayout } from './Layout';

interface BreadcrumbLinkProps {
    path: string;
    children: ReactElement | string;
}

function BreadcrumbLink({ path, children }: BreadcrumbLinkProps): ReactElement {
    const navigate = useNavigate();
    return <a onClick={() => navigate(path)}>{children}</a>;
}

interface BreadcrumbItem {
    key: string;
    title: string;
    icon?: string;
    path?: string;
    children?: MenuItemProps[];
}

function getBreadcrumbMenuItem(
    children: Required<Exclude<BreadcrumbItem, 'children'>>[],
    icons: Record<string, FC>
): MenuItemProps[] {
    return children.map(({ key, title, icon, path }) => {
        const item = {
            key,
            title: <BreadcrumbLink path={path}>{title}</BreadcrumbLink>
        };
        if (icon) {
            Object.assign(item, { icon: createElement(icons[icon]) });
        }
        return item;
    });
}

export async function breadcrumbsLoader(icons: Record<string, FC>, { request }: LoaderFunctionArgs): Promise<BreadcrumbProps['items']> {
    const currentPath = new URL(request.url).pathname;
    if (currentPath === '/') {
        return [ { title: <Space><HomeOutlined/><span>Home</span></Space> } ];
    }
    const { data } = await post<BreadcrumbItem[]>('Navigation.GetBreadcrumbsData', { path: currentPath });

    return [
        {
            key: 'home',
            className: 'cursor-pointer',
            title: <BreadcrumbLink path="/"><HomeOutlined/></BreadcrumbLink>,
        },
        ...data.map(({ key, title, path, icon, children }) => {
            const item = {
                key,
                title,
            };
            if (children) {
                Object.assign(item, {
                    menu: {
                        items: getBreadcrumbMenuItem(children as Required<Exclude<BreadcrumbItem, 'children'>>[], icons)
                    }
                });
            }
            if (icon) {
                Object.assign(
                    item,
                    {
                        className: 'cursor-pointer',
                        title: <Space>{createElement(icons[icon])}<span>{title}</span></Space>
                    }
                );
            }
            if (path && currentPath !== path) {
                Object.assign(item, { title: <BreadcrumbLink path={path}>{item.title}</BreadcrumbLink> });
            }
            return item;
        })
    ];
}

export default function MainView() {
    return <MainLayout
        headerTitle="ATREDO"
        bodyContent={<Outlet/>}/>;
};


interface ErrorContentProps {
    message: string;
}

export function ErrorContent({ message }: ErrorContentProps) {
    return <Result status="error"
                   title={message}/>;
}
