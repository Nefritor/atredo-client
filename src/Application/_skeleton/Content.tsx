import { Skeleton } from 'antd';

import { BaseSkeletonProps } from './interface';

export default function ContentSkeleton({ active }: BaseSkeletonProps) {
    return <Skeleton paragraph={{ rows: 15 }} active={active}/>;
}
