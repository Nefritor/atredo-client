import { Breadcrumb, BreadcrumbProps, Button, Drawer, Flex, Layout, Menu, theme, Typography } from 'antd';
import { ReactElement, useCallback, useContext, useMemo, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { MenuContext } from './Context';

const { Text } = Typography;
const { Header, Footer } = Layout;

interface MainLayoutProps {
    headerTitle: string;
    headerContent?: ReactElement;
    bodyContent: ReactElement;
}

export function MainLayout(
    {
        headerTitle,
        headerContent,
        bodyContent
    }: MainLayoutProps
) {
    const { token: { fontSizeHeading2 } } = theme.useToken();

    return <Layout className="h-screen w-screen">
        <Header className="flex items-center">
            <Flex align="baseline"
                  gap="middle">
                <Text strong
                      style={{
                          fontSize: fontSizeHeading2,
                          lineHeight: fontSizeHeading2,
                          color: 'white',
                          userSelect: 'none'
                      }}>
                    {headerTitle}
                </Text>
                {headerContent}
            </Flex>
        </Header>
        {bodyContent}
        <Footer className="text-center">
            Atredo ©2024 Created by M. Khamitov
        </Footer>
    </Layout>;
}

interface ContentWrapperLayoutProps {
    menuButtonContent: ReactElement;
    breadcrumbsContent: ReactElement;
    children: ReactElement;
}

export function ContentWrapperLayout(
    {
        menuButtonContent,
        breadcrumbsContent,
        children
    }: ContentWrapperLayoutProps
) {
    const { token: { colorBgContainer, padding } } = theme.useToken();
    return <Flex flex="max-content"
                 gap="middle"
                 style={{
                     paddingTop: padding,
                     paddingLeft: padding,
                     paddingRight: padding
                 }}
                 vertical>
        <Flex flex="max-content"
              gap="middle"
              align="center">
            <Flex align="center">
                {menuButtonContent}
            </Flex>
            {breadcrumbsContent}
        </Flex>
        <div className="h-full w-full rounded-lg"
             style={{
                 backgroundColor: colorBgContainer,
                 padding
             }}>
            {children}
        </div>
    </Flex>;
}

interface ContentLayoutProps {
    children: ReactElement;
}

export function ContentLayout({ children }: ContentLayoutProps) {
    const menu = useContext(MenuContext);
    const navigate = useNavigate();
    const location = useLocation();
    const breadcrumbs = useLoaderData() as BreadcrumbProps['items'];

    const [ isDrawerOpened, setDrawerOpened ] = useState<boolean>(false);

    const selectedMenuKeys = useMemo(() => {
        if (location.pathname === '/') {
            return [ 'home' ];
        }
        const key = location.pathname.match(new RegExp('^\/([\\S\-]*)$'))?.pop();
        if (key) {
            return [ key ];
        }
        return [];
    }, [ location.pathname ]);
    const drawerStyles = useMemo(() => ({ body: { padding: 0 } }), []);

    const onMenuSelect = useCallback((key: string) => {
        navigate(key === 'home' ? '/' : `/${key}`);
        setDrawerOpened(false);
    }, [ navigate ]);

    const onDrawerClose = () => {
        setDrawerOpened(false);
    };

    const openDrawer = () => {
        setDrawerOpened(true);
    };
    return <ContentWrapperLayout
        menuButtonContent={
            <Button size="large"
                    type="text"
                    icon={<MenuOutlined/>}
                    onClick={openDrawer}/>
        }
        breadcrumbsContent={
            <Breadcrumb className="flex items-center"
                        items={breadcrumbs}/>
        }>
        <>
            {children}
            <Drawer title="Navigation"
                    placement="left"
                    styles={drawerStyles}
                    width={250}
                    open={isDrawerOpened}
                    closable={false}
                    onClose={onDrawerClose}>
                <Flex flex="max-content"
                      vertical>
                    <Menu items={menu}
                          selectedKeys={selectedMenuKeys}
                          mode="inline"
                          onSelect={({ key }) => onMenuSelect(key)}/>
                </Flex>
            </Drawer>
        </>
    </ContentWrapperLayout>;
}
