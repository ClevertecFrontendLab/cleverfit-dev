import { FilterType, Training } from '@pages/achievements-page/types';

export const filterTrainingByName = (filter: FilterType, trainings?: Training[]): Training[] => {
    if (!trainings) return [];

    return trainings.map((item) => {
        const filteredData = {
            weight: 0,
            approaches: 0,
            replays: 0,
            sumLoadsByExercise: 0,
            exercisesCount: 0,
        };

        const filteredTrainings = item.trainings.filter((el) => {
            if (el.name === filter || filter === 'Все') {
                const newFilteredData = el.exercises.reduce(
                    (acc, ex) => ({
                        weight: acc.weight + ex.weight,
                        approaches: acc.approaches + ex.approaches,
                        replays: acc.replays + ex.replays,
                        sumLoadsByExercise:
                            acc.sumLoadsByExercise +
                            Math.round(ex.weight) * ex.approaches * ex.replays,
                    }),
                    {
                        weight: 0,
                        approaches: 0,
                        replays: 0,
                        sumLoadsByExercise: 0,
                    },
                );

                filteredData.weight += newFilteredData.weight;
                filteredData.approaches += newFilteredData.approaches;
                filteredData.replays += newFilteredData.replays;
                filteredData.sumLoadsByExercise += newFilteredData.sumLoadsByExercise;
                filteredData.exercisesCount += el.exercises.length;

                return true;
            }

            return false;
        });

        const avgWorkLoad = Math.round(
            filteredData.sumLoadsByExercise / filteredData.exercisesCount,
        );

        return {
            ...item,
            trainings: filteredTrainings,
            weight: filteredData.weight,
            approaches: filteredData.approaches,
            replays: filteredData.replays,
            avgWorkLoad,
            workLoad: filteredData.sumLoadsByExercise,
        };
    });
};
