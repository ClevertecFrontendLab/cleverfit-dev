import { TrainingFilters } from '@pages/achievements-page/training-filters';
import { FilterType } from '@pages/achievements-page/types';

import styles from './filters-block.module.css';

type FiltersBlockProps = {
    currentFilter: FilterType;
    setCurrentFilter: (filter: FilterType) => void;
};

export const FiltersBlock = ({ currentFilter, setCurrentFilter }: FiltersBlockProps) => (
    <div className={styles.container}>
        <span className={styles.filterTitle}>Тип тренировки:</span>

        <TrainingFilters currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
    </div>
);
