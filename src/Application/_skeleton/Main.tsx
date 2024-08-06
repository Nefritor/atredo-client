import { ContentWrapperLayout, MainLayout } from 'Application/main';

import MenuButtonSkeleton from './MenuButton';
import BreadcrumbsSkeleton from './Breadcrumbs';
import ContentSkeleton from './Content';

export default function MainSkeleton() {
    return <MainLayout
        headerTitle="ATREDO"
        bodyContent={
            <ContentWrapperLayout
                menuButtonContent={<MenuButtonSkeleton active/>}
                breadcrumbsContent={<BreadcrumbsSkeleton active/>}>
                <ContentSkeleton active/>
            </ContentWrapperLayout>
        }/>;
}
