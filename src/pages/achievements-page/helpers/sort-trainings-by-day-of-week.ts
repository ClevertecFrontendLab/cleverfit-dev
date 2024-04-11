import { weekDaysLocaleMap } from '@pages/achievements-page/constants/week-days';
import { Training } from '@pages/achievements-page/types';

export const sortTrainingsByDayOfWeek = (trainings: Training[]) => {
    const sundayIndex = trainings.findIndex((item) => item.date === weekDaysLocaleMap.Sunday);
    const copyTrainings = [...trainings];

    if (sundayIndex !== -1 ?? sundayIndex < 6) {
        const elementsToMove = copyTrainings.splice(sundayIndex + 1);

        return [...elementsToMove, ...copyTrainings];
    }

    return trainings;
};
