import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Rate } from 'antd';

import styles from './review-card.module.scss';

// type ReviewCardProps = {
//     icon: string;

// }

export const ReviewCard = () => (
    <Card className={styles.reviewCardWrap} bordered={false}>
        <div className={styles.reviewCard}>
            <div className={styles.profileInfo}>
                <Avatar size={42} icon={<UserOutlined />} />
                <div>
                    <h6 className={styles.profileName}>Вероника</h6>
                    <h6 className={styles.profileSurName}>Киверова</h6>
                </div>
            </div>
            <div className={styles.descriptionBlock}>
                <div className={styles.ratingDate}>
                    <Rate
                        style={{ color: '#faad14' }}
                        className={styles.rate}
                        disabled={true}
                        defaultValue={3}
                    />
                    <span className={styles.date}>17.10.2023</span>
                </div>
                <div className={styles.description}>
                    Я очень довольна этим приложением! Оно помогает мне следить за своим здоровьем и
                    физической формой, предлагая разнообразные упражнения и питание. Я люблю, что
                    приложение адаптируется к моему уровню и целям, и дает мне полезные советы и
                    обратную связь. Я рекомендую это приложение всем, кто хочет улучшить свою жизнь!
                </div>
            </div>
        </div>
    </Card>
);
