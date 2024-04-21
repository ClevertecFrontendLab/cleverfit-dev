import { ACTIVE_RED } from '@components/workload-by-day-of-week/constants/colors';
import { Badge, Space } from 'antd';

type ExerciseItemProps = {
    serialNumber: number;
    day: string;
    exercise?: string;
};

export const ExerciseItem = ({ exercise, day, serialNumber }: ExerciseItemProps) => (
    <Space style={{ minHeight: 32, width: '100%' }} align='start' size={16} direction='horizontal'>
        <Badge count={serialNumber} color={ACTIVE_RED} />
        <div style={{ width: 92, color: '#8C8C8C' }}>{day}</div>
        <span style={{ fontWeight: 700 }}>{exercise ?? ''}</span>
    </Space>
);
