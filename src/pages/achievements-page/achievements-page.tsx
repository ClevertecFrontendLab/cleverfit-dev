import { Fragment, useMemo, useState } from 'react';
import { TabName, tabs } from '@pages/achievements-page/constants/tabs';
import { ExercisesStatisticBlock } from '@pages/achievements-page/exercises-statistic-block';
import { FiltersBlock } from '@pages/achievements-page/filters-block';
import { filterTrainingByName } from '@pages/achievements-page/helpers/filter-training-by-name';
import { getTrainingsForStatistic } from '@pages/achievements-page/helpers/get-trainings-for-statistic';
import { hasTrainings } from '@pages/achievements-page/helpers/has-trainings';
import { MostFrequentBlock } from '@pages/achievements-page/most-frequent-block';
import { NotFoundTraining } from '@pages/achievements-page/not-found-training/not-found-training';
import { TrainingStatisticCardsBlock } from '@pages/achievements-page/training-statistic-cards-block';
import { FilterType } from '@pages/achievements-page/types';
import { WorkloadStatisticBlock } from '@pages/achievements-page/workload-statistic-block';
import { useGetUserTrainingQuery } from '@redux/serviсes/training';
import { CustomSpace } from '@shared/components/custom-space';
import { Tabs } from 'antd';

export const AchievementsPage = () => {
    const [currentFilter, setCurrentFilter] = useState<FilterType>('Все');
    const [currentPeriodFilter, setCurrentPeriodFilter] = useState<TabName>(TabName.week);
    const { data: trainings } = useGetUserTrainingQuery();
    const isMonthPeriod = currentPeriodFilter === 'month';
    const isFilterAll = currentFilter === 'Все';

    const dataForWeightStatistic = useMemo(
        () =>
            getTrainingsForStatistic({
                trainings,
                periodFilter: currentPeriodFilter,
                formatDay: isMonthPeriod ? 'DD.MM.YYYY' : 'dayOfWeek',
            }),
        [currentPeriodFilter, isMonthPeriod, trainings],
    );

    const filteredTrainings = useMemo(
        () => filterTrainingByName(currentFilter, dataForWeightStatistic),
        [currentFilter, dataForWeightStatistic],
    );

    const changePeriodFilter = (activeKey: string) => {
        setCurrentPeriodFilter(activeKey as TabName);
    };

    return (
        <CustomSpace direction='vertical' size={24}>
            <Tabs
                activeKey={currentPeriodFilter}
                onChange={changePeriodFilter}
                defaultActiveKey={TabName.week}
                items={tabs}
            />
            <FiltersBlock currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />
            {hasTrainings(filteredTrainings) && (
                <Fragment>
                    <WorkloadStatisticBlock
                        filteredTrainings={filteredTrainings}
                        isMonthPeriod={isMonthPeriod}
                    />
                    <TrainingStatisticCardsBlock
                        filteredTrainings={filteredTrainings}
                        isMonthPeriod={isMonthPeriod}
                    />
                    <MostFrequentBlock
                        filteredTrainings={filteredTrainings}
                        isFilterAll={isFilterAll}
                    />
                    <ExercisesStatisticBlock
                        filteredTrainings={filteredTrainings}
                        isMonthPeriod={isMonthPeriod}
                    />
                </Fragment>
            )}
            {!hasTrainings(filteredTrainings) && <NotFoundTraining />}
        </CustomSpace>
    );
};
