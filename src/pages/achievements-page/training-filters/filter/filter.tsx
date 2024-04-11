import { FilterType } from '@pages/achievements-page/types';
import { Tag } from 'antd';

type FilterProps = {
    type: FilterType;
    currentType: FilterType;
    setFilterType: (filter: FilterType) => void;
};

export const Filter = ({ type, currentType, setFilterType }: FilterProps) => (
    <Tag
        style={{ cursor: 'pointer' }}
        color={currentType === type ? 'blue' : ''}
        onClick={() => setFilterType(type)}
    >
        {type}
    </Tag>
);
