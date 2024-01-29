import { Avatar, Card, Rate } from 'antd';

import styles from './review-card.module.scss';

type ReviewCardProps = {
    fullName: string;
    imageSrc: string;
    message: string;
    rating: number;
    createdAt: Date;
};

export const ReviewCard = ({ fullName, imageSrc, message, rating, createdAt }: ReviewCardProps) => {
    const name = fullName;
    const surName = fullName;
    // const date = createdAt.toTimeString;

    return (
        <Card className={styles.reviewCardWrap} bordered={false}>
            <div className={styles.reviewCard}>
                <div className={styles.profileInfo}>
                    <Avatar size={42} icon={imageSrc} />
                    <div>
                        <h6 className={styles.profileName}>{name}</h6>
                        <h6 className={styles.profileSurName}>{surName}</h6>
                    </div>
                </div>
                <div className={styles.descriptionBlock}>
                    <div className={styles.ratingDate}>
                        <Rate
                            style={{ color: '#faad14' }}
                            className={styles.rate}
                            disabled={true}
                            defaultValue={rating}
                        />
                        <span className={styles.date}>12/04/2024</span>
                    </div>
                    <div className={styles.description}>{message}</div>
                </div>
            </div>
        </Card>
    );
};
