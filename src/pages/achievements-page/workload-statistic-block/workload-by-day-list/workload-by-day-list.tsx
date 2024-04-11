import { useMemo } from 'react';
import { WorkloadByDayOfWeek } from '@components/workload-by-day-of-week';
import { getTrainingsByWeeks } from '@pages/achievements-page/helpers/get-trainings-by-weeks';
import { sortTrainingsByDayOfWeek } from '@pages/achievements-page/helpers/sort-trainings-by-day-of-week';
import { Training } from '@pages/achievements-page/types';
import { Col, Row } from 'antd';

type WorkloadItemsByWeeksProps = {
    filteredTrainings: Training[];
    isMonthPeriod: boolean;
};

export const WorkloadItemsByWeeks = ({
    filteredTrainings,
    isMonthPeriod,
}: WorkloadItemsByWeeksProps) => {
    const workloadItems = useMemo(
        () => sortTrainingsByDayOfWeek(filteredTrainings),
        [filteredTrainings],
    );
    const workloadItemsByWeeks = useMemo(() => getTrainingsByWeeks(workloadItems), [workloadItems]);

    return isMonthPeriod ? (
        <Row gutter={[16, 16]} wrap={true}>
            {workloadItemsByWeeks.map((items, index) => {
                const title = `Неделя ${items[0]?.type}-${items[6]?.type}`;

                return (
                    <Col lg={6} md={12} xs={24} key={String(Symbol(index))}>
                        <WorkloadByDayOfWeek title={title} items={items} />
                    </Col>
                );
            })}
        </Row>
    ) : (
        <WorkloadByDayOfWeek title='Средняя нагрузка по дням недели' items={workloadItems} />
    );
};
