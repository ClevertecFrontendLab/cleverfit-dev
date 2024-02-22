import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { UserTraining } from '@redux/types/training.ts';
import { Button, Card, Typography } from 'antd';

import styles from './edit-exercises-card.module.css';

type CardProps = {
    selectedTraining: UserTraining;
    onClose: VoidFunction;
    onEditExercises: (training: UserTraining) => void;
};

export const EditExercisesCard: React.FC<CardProps> = ({
    selectedTraining,
    onClose,
    onEditExercises,
}) => {
    const editExercisesHandel = () => {
        onEditExercises(selectedTraining)
    };

    return (
        <Card
            className={styles.editCard}
            actions={[
                <Button block={true} size='middle' type='ghost' onClick={editExercisesHandel}>
                    Добавить упражнения
                </Button>,
            ]}
        >
            <div className={styles.cardWrapper}>
                <div className={styles.titleWrapper}>
                    <Button
                        type='text'
                        size='small'
                        icon={<ArrowLeftOutlined />}
                        onClick={onClose}
                    />
                    <div>{selectedTraining?.name}</div>
                </div>
                <div className={styles.cardBody}>
                    {selectedTraining?.exercises?.map(({ name }) => (
                        <Typography.Text type='secondary' className={styles.items}>
                            {name}
                        </Typography.Text>
                    ))}
                </div>
            </div>
        </Card>
    );
};
