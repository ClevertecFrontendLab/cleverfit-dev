import { Training } from '@pages/achievements-page/types';

export const hasTrainings = (trainings: Training[]) =>
    trainings.some((item) => item.trainings.length);
