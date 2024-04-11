import { Training } from '@pages/achievements-page/types';

export const getTrainingsByWeeks = (trainings: Training[]): Training[][] => {
    const copyTrainings = [...trainings];

    const result = [];

    while (copyTrainings.length > 0) {
        result.push(copyTrainings.splice(0, 7));
    }

    return result;
};
