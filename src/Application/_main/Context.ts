import { createContext, FC } from 'react';
import { MenuProps } from 'antd';

export const MenuContext = createContext<MenuProps['items']>([]);
export const IconsContext = createContext<Record<string, FC>>({});
