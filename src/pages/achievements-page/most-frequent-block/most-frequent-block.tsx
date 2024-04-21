import { getMostCommonTrainings } from '@pages/achievements-page/helpers/get-most-common-trainings';
import { MostFrequentCard } from '@pages/achievements-page/most-frequent-block/most-frequent-card';
import { Training } from '@pages/achievements-page/types';
import { CustomSpace } from '@shared/components/custom-space';

type MostFrequentBlockProps = {
    filteredTrainings: Training[];
    isFilterAll: boolean;
};

export const MostFrequentBlock = ({ filteredTrainings, isFilterAll }: MostFrequentBlockProps) => {
    const { mostFrequentTrainingName, mostFrequentExerciseName } =
        getMostCommonTrainings(filteredTrainings);

    return (
        <CustomSpace style={{ padding: '12px 0' }} direction='vertical' size={16}>
            {isFilterAll && (
                <MostFrequentCard
                    title='Самая частая тренировка'
                    value={mostFrequentTrainingName}
                />
            )}
            <MostFrequentCard title='Самое частое упражнение' value={mostFrequentExerciseName} />
        </CustomSpace>
    );
};
