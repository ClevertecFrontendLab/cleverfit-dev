import { useMemo } from 'react';
import { DAYS_IN_MONTH, DAYS_IN_WEEK } from '@pages/achievements-page/constants/week-days';
import { TrainingStatisticCard } from '@pages/achievements-page/training-statistic-cards-block/training-statistic-card';
import { Training } from '@pages/achievements-page/types';

import styles from './training-statistic-cards.module.css';

type TrainingStatisticCarsBlockProps = {
    filteredTrainings: Training[];
    isMonthPeriod: boolean;
};
export const TrainingStatisticCardsBlock = ({
    filteredTrainings,
    isMonthPeriod,
}: TrainingStatisticCarsBlockProps) => {
    const commonWorkload = useMemo(
        () => filteredTrainings.reduce((acc, el) => el.weight + acc, 0),
        [filteredTrainings],
    );
    const avgWorkload = (commonWorkload / (isMonthPeriod ? DAYS_IN_MONTH : DAYS_IN_WEEK)).toFixed(
        1,
    );
    const approachesCount = useMemo(
        () => filteredTrainings.reduce((acc, el) => el.approaches + acc, 0),
        [filteredTrainings],
    );
    const replaysCount = useMemo(
        () => filteredTrainings.reduce((acc, el) => el.replays + acc, 0),
        [filteredTrainings],
    );

    return (
        <div className={styles.container}>
            <TrainingStatisticCard
                value={commonWorkload}
                firstDescription='Общая'
                secondDescription='нагрузка, кг'
            />
            <TrainingStatisticCard
                value={avgWorkload}
                firstDescription='Нагрузка'
                secondDescription='в день, кг'
            />
            <TrainingStatisticCard
                value={replaysCount}
                firstDescription='Количество'
                secondDescription='повторений, раз'
            />
            <TrainingStatisticCard
                value={approachesCount}
                firstDescription='Подходы,'
                secondDescription='раз'
            />
        </div>
    );
};
