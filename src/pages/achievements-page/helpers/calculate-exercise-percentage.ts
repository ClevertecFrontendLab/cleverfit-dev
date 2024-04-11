export const calculateExercisePercentages = (
    data: Record<string, string>,
): Array<{ exercise: string; percent: number }> => {
    const exercises: string[] = Object.values(data).filter((value) => value);

    const exerciseCounts: Record<string, number> = {};

    exercises.forEach((exercise) => {
        if (exercise) {
            exerciseCounts[exercise] = (exerciseCounts[exercise] || 0) + 1;
        }
    });

    const totalExercises = exercises.length;
    const uniqueExercises = Object.keys(exerciseCounts);

    return uniqueExercises.map((exercise) => {
        const count = exerciseCounts[exercise];
        const percentage = ((count / totalExercises) * 100).toFixed(2);

        return {
            exercise,
            percent: Number(percentage),
        };
    });
};
