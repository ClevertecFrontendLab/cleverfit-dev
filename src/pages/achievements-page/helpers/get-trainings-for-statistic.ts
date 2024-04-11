import {
    DAYS_IN_MONTH,
    DAYS_IN_WEEK,
    weekDaysLocaleMap,
    WeekDaysLocalKeys,
} from '@pages/achievements-page/constants/week-days';
import { PeriodFilterType, Training } from '@pages/achievements-page/types';
import { Exercises, UserTrainingTransform } from '@redux/types/training';
import { FORMAT_D_M_Y_POINT } from '@utils/format-date';
import moment from 'moment';

type FunctionParams = {
    formatDay: 'dayOfWeek' | typeof FORMAT_D_M_Y_POINT;
    periodFilter: PeriodFilterType;
    trainings?: UserTrainingTransform;
};

export const getTrainingsForStatistic = ({
    formatDay,
    trainings,
    periodFilter,
}: FunctionParams): Training[] => {
    const dataForWeightStatistic: Training[] = [];
    const isDayOfWeekFormat = formatDay === 'dayOfWeek';

    const nextSunday = moment().clone().endOf('week').add(1, 'day');
    const currentDate = moment().clone();
    const daysUntilSunday = nextSunday.diff(currentDate, 'days');

    const isWeekFilter = periodFilter === 'week';

    const initCounter = isWeekFilter ? DAYS_IN_WEEK - 1 : DAYS_IN_MONTH - daysUntilSunday;
    const edgeValue = isWeekFilter ? 0 : 0 - daysUntilSunday + 1;

    for (let i = initCounter; i >= edgeValue; i--) {
        const date = moment().clone().subtract(i, 'days');

        const formattedDate = date.format('YYYY-MM-DD');

        const formattedTrainings =
            trainings?.[formattedDate]?.map((el) => ({
                name: el.name,
                exercises: el.exercises,
            })) ?? ([] as Array<{ name: string; exercises: Exercises[] }>);

        const dayOfWeek = date.format('dddd') as WeekDaysLocalKeys;

        dataForWeightStatistic.push({
            type: date.format('DD.MM'),
            trainings: formattedTrainings,
            approaches: 0,
            replays: 0,
            weight: 0,
            date: isDayOfWeekFormat ? weekDaysLocaleMap[dayOfWeek] : date.format('DD.MM.YYYY'),
        });
    }

    return dataForWeightStatistic;
};
