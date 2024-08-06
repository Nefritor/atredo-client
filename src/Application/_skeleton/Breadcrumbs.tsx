import { Skeleton } from 'antd';

import { BaseSkeletonProps } from './interface';

export default function BreadcrumbsSkeleton({ active }: BaseSkeletonProps) {
    return <Skeleton.Input size="small" active={active}/>;
}
