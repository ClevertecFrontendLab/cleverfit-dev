import { ExercisesByDays } from '@components/exercises-by-days/exercises-by-days';
import { PieGraph } from '@components/pie-graph';
import { calculateExercisePercentages } from '@pages/achievements-page/helpers/calculate-exercise-percentage';
import { getMostFrequentExercisesByDay } from '@pages/achievements-page/helpers/get-most-frequent-exercises-by-day';
import { Training } from '@pages/achievements-page/types';
import { Col, Row } from 'antd';

type ExercisesStatisticBlockProps = {
    filteredTrainings: Training[];
    isMonthPeriod: boolean;
};

export const ExercisesStatisticBlock = ({
    filteredTrainings,
    isMonthPeriod,
}: ExercisesStatisticBlockProps) => {
    const exercisesByWeekDays = getMostFrequentExercisesByDay(filteredTrainings, isMonthPeriod);

    return (
        <Row>
            <Col
                lg={12}
                md={24}
                xs={24}
                style={{
                    marginRight: 150,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <PieGraph data={calculateExercisePercentages(exercisesByWeekDays)} />
            </Col>
            <Col lg={6} md={24} xs={24}>
                <ExercisesByDays items={exercisesByWeekDays} />
            </Col>
        </Row>
    );
};
