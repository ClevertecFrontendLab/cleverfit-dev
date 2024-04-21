import styles from './not-found-training.module.css';

export const NotFoundTraining = () => (
    <div className={styles.container}>
        <div>
            <img src='../../public/not-found-training.png' alt='Девочка с табличкой "Not Found"' />
        </div>
        <h3 className={styles.text}>Ой, такой тренировки на этой неделе не было.</h3>
    </div>
);
