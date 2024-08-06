import { Skeleton } from 'antd';

import { BaseSkeletonProps } from './interface';

export default function MenuButtonSkeleton({ active }: BaseSkeletonProps) {
    return <Skeleton.Button size="large" style={{ width: 40, minWidth: 40 }} active={active}/>;
}
