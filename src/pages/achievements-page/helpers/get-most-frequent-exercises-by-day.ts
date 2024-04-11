import { weekDaysLocaleMap } from '@pages/achievements-page/constants/week-days';
import { Training } from '@pages/achievements-page/types';
import moment from 'moment';

interface ExerciseCountsByDay {
    [dayOfWeek: string]: {
        [exerciseName: string]: number;
    };
}

interface MostFrequentExercisesByDay {
    [dayOfWeek: string]: string;
}

export const getMostFrequentExercisesByDay = (
    data: Training[],
    isMonthPeriod: boolean,
): MostFrequentExercisesByDay => {
    const exerciseCountsByDay: ExerciseCountsByDay = {};

    data.forEach(({ date, trainings }) => {
        const dayOfWeek = isMonthPeriod ? weekDaysLocaleMap[getDayOfWeek(date)] : date;

        if (!exerciseCountsByDay[dayOfWeek]) {
            exerciseCountsByDay[dayOfWeek] = {};
        }

        trainings.forEach(({ exercises }) => {
            exercises.forEach(({ name: exercisesName }) => {
                if (!exerciseCountsByDay[dayOfWeek][exercisesName]) {
                    exerciseCountsByDay[dayOfWeek][exercisesName] = 0;
                }

                exerciseCountsByDay[dayOfWeek][exercisesName] += 1;
            });
        });
    });

    const mostFrequentExercisesByDay: MostFrequentExercisesByDay = {};

    const daysOfWeek = Object.keys(exerciseCountsByDay);

    for (let i = 0; i < daysOfWeek.length; i++) {
        const dayOfWeek = daysOfWeek[i];
        const exercises = exerciseCountsByDay[dayOfWeek];

        let maxCount = 0;
        let mostFrequentExercise = '';

        const exerciseNames = Object.keys(exercises);

        for (let j = 0; j < exerciseNames.length; j++) {
            const exerciseName = exerciseNames[j];
            const count = exercises[exerciseName];

            if (count > maxCount) {
                maxCount = count;
                mostFrequentExercise = exerciseName;
            }
        }

        mostFrequentExercisesByDay[dayOfWeek] = mostFrequentExercise;
    }

    return mostFrequentExercisesByDay;
};

function getDayOfWeek(dateString: string): string {
    const momentDate = moment(dateString, 'DD.MM.YYYY', true);

    return momentDate.format('dddd');
}
