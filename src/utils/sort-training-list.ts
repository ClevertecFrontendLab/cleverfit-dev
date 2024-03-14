import { UserJointTrainigList } from '@redux/types/invite';

export const sortTrainingList = (list: UserJointTrainigList[]) =>
    [...list].sort((a, b) => {
        const statusOrder: Record<string, number> = {
            accepted: 0,
            pending: 1,
            null: 2,
            rejected: 3,
        };

        const statusA = a.status || 'null';
        const statusB = b.status || 'null';

        return statusOrder[statusA] - statusOrder[statusB];
    });
