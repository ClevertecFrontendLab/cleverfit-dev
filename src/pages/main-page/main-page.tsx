import calendarIcon from '@shared/assets/icons/buttons/icon-calendar.svg';
import profileIcon from '@shared/assets/icons/buttons/icon-profile.svg';
import trainingIcon from '@shared/assets/icons/buttons/icon-training.svg';
import {
    DescriptionCard,
    DescriptionCardTextColor,
    DescriptionCardTextSize,
} from '@shared/components/description-card';
import { Button, Card } from 'antd';

import styles from './main-page.module.css';

const cardHeadStyle = {
    display: 'flex',
    justifyContent: 'center',
    font: 'var(--font-m)',
    padding: '12px 24px',
};

const cardBodyStyle = {
    height: '42px',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export const MainPage = () => (
    <div className={styles.cardBlock}>
        <DescriptionCard
            textSize={DescriptionCardTextSize.MEDIUM}
            textColor={DescriptionCardTextColor.BLUE}
            className={styles.margin24px}
        >
            С CleverFit ты сможешь:
            <ul className={styles.descriptionList}>
                <li>— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;</li>
                <li>
                    — отслеживать свои достижения в разделе статистики, сравнивая свои результаты с
                    нормами и рекордами;
                </li>
                <li>
                    — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о
                    тренировках;
                </li>
                <li>
                    — выполнять расписанные тренировки для разных частей тела, следуя подробным
                    инструкциям и советам профессиональных тренеров.
                </li>
            </ul>
        </DescriptionCard>

        <DescriptionCard
            textSize={DescriptionCardTextSize.LARGE}
            textColor={DescriptionCardTextColor.DARK}
            className={styles.margin16px}
        >
            CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
            откладывай на завтра — начни тренироваться уже сегодня!
        </DescriptionCard>

        <div className={styles.actionCardsBlocks}>
            <Card
                title='Расписать тренировки'
                bordered={false}
                className={styles.fullWidth}
                headStyle={cardHeadStyle}
                bodyStyle={cardBodyStyle}
            >
                <Button type='text' className={styles.cardButton}>
                    <img alt='android' src={trainingIcon} />
                    <span>Тренировки</span>
                </Button>
            </Card>
            <Card
                title='Назначить тренировки'
                bordered={false}
                className={styles.fullWidth}
                headStyle={cardHeadStyle}
                bodyStyle={cardBodyStyle}
            >
                <Button type='text' className={styles.cardButton}>
                    <img alt='android' src={calendarIcon} />
                    <span>Календарь</span>
                </Button>
            </Card>
            <Card
                title='Заполнить профиль'
                bordered={false}
                className={styles.fullWidth}
                headStyle={cardHeadStyle}
                bodyStyle={cardBodyStyle}
            >
                <Button type='text' className={styles.cardButton}>
                    <img alt='android' src={profileIcon} />
                    <span>Профиль</span>
                </Button>
            </Card>
        </div>
    </div>
);
