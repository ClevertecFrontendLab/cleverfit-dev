import { Exercises } from '@redux/types/training';

export type Training = {
    type: string;
    weight: number;
    replays: number;
    approaches: number;
    trainings: Array<{
        name: string;
        exercises: Exercises[];
    }>;
    date: string;
    exercisesCount: number;
    avgWorkLoad: number;
    workLoad: number;
};
export type FilterType = 'Все' | string;
