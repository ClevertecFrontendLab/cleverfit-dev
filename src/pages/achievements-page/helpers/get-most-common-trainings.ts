import { Training } from '@pages/achievements-page/types';

export const getMostCommonTrainings = (data: Training[]) => {
    const trainingCounts: Record<string, number> = {};
    const exerciseCounts: Record<string, number> = {};
    let mostFrequentTrainingName = '';
    let mostFrequentExerciseName = '';
    let maxTrainingCount = 0;

    data.forEach(({ trainings }) => {
        trainings.forEach(({ name: trainingsName, exercises }) => {
            // Подсчёт частоты тренировок
            trainingCounts[trainingsName] = (trainingCounts[trainingsName] || 0) + 1;

            if (trainingCounts[trainingsName] > maxTrainingCount) {
                maxTrainingCount = trainingCounts[trainingsName];
                mostFrequentTrainingName = trainingsName;
            }

            // Подсчёт частоты упражнений
            exercises.forEach(({ name: exerciseName }) => {
                exerciseCounts[exerciseName] = (exerciseCounts[exerciseName] || 0) + 1;

                if (
                    trainingCounts[trainingsName] === maxTrainingCount &&
                    exerciseCounts[exerciseName] > (exerciseCounts[mostFrequentExerciseName] || 0)
                ) {
                    mostFrequentExerciseName = exerciseName;
                }
            });
        });
    });

    return { mostFrequentTrainingName, mostFrequentExerciseName };
};
