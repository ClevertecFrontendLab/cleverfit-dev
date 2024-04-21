import { Card } from 'antd';

import styles from './training-statistic-card.module.css';

type TrainingStatisticCardProps = {
    value: number | string;
    firstDescription: string;
    secondDescription: string;
};

export const TrainingStatisticCard = ({
    firstDescription,
    secondDescription,
    value,
}: TrainingStatisticCardProps) => (
    <Card className={styles.card} bodyStyle={{ padding: 0 }}>
        <div className={styles.cardContent}>
            <div className={styles.value}>{value}</div>
            <div className={styles.text}>{firstDescription}</div>
            <div className={styles.text}>{secondDescription}</div>
        </div>
    </Card>
);
