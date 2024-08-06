import { ReactElement } from 'react';

export interface RawRouterItem {
    key: string;
    component: string;
}

export interface RawMenuItem {
    key: string;
    label: string;
    icon?: string;
    path: string;
    children: RawMenuItem[];
}

export interface LazyElementProps {
    component: string;
    skeleton: ReactElement;
}
