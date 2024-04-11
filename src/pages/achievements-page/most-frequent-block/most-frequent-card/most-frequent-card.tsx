import { CustomSpace } from '@shared/components/custom-space';

import styles from './most-frequent-card.module.css';

type MostFrequentCardProps = {
    title: string;
    value: string;
};
export const MostFrequentCard = ({ title, value }: MostFrequentCardProps) => (
    <CustomSpace size={16} direction='horizontal'>
        <div className={styles.titleContainer}>
            <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.value}>{value}</div>
    </CustomSpace>
);
