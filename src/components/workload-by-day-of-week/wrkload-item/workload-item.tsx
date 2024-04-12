import {
    ACTIVE_BLUE,
    FONT_INACTIVE_BLUE,
    INACTIVE_BLUE,
} from '@components/workload-by-day-of-week/constants/colors';
import { WorkloadByDayOfWeekType } from '@components/workload-by-day-of-week/type';
import { Badge, Space } from 'antd';

type WorkloadItemProps = {
    serialNumber: number;
    item: WorkloadByDayOfWeekType;
};
export const WorkloadItem = ({ item, serialNumber }: WorkloadItemProps) => (
    <Space style={{ height: 32 }} size={16} direction='horizontal'>
        <Badge
            count={serialNumber}
            color={item.avgWorkLoad ? ACTIVE_BLUE : INACTIVE_BLUE}
            style={{ color: item.avgWorkLoad ? '' : FONT_INACTIVE_BLUE }}
        />
        <div style={{ width: 92, color: '#8C8C8C' }}>{item.date}</div>
        <span style={{ fontWeight: 700 }}>{item.avgWorkLoad ? `${item.avgWorkLoad} кг` : ''}</span>
    </Space>
);
