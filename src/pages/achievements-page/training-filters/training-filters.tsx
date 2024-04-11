import { Filter } from '@pages/achievements-page/training-filters/filter';
import { FilterType } from '@pages/achievements-page/types';
import { useGetTrainingListQuery } from '@redux/serviсes/training';
import { Space } from 'antd';

type TrainingFiltersProps = {
    currentFilter: FilterType;
    setCurrentFilter: (filter: FilterType) => void;
};

export const TrainingFilters = ({ setCurrentFilter, currentFilter }: TrainingFiltersProps) => {
    const { data: trainingList = [] } = useGetTrainingListQuery();
    const resultTrainingList = ['Все', ...trainingList];

    return (
        <Space direction='horizontal' size={8} wrap={true}>
            {resultTrainingList.map((name) => (
                <Filter
                    key={name}
                    type={name}
                    currentType={currentFilter}
                    setFilterType={setCurrentFilter}
                />
            ))}
        </Space>
    );
};
