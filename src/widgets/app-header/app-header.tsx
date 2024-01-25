import { useNavigate } from 'react-router-dom';
import { Paths } from '@routes/paths';
import settingsIcon from '@shared/assets/icons/buttons/icon-settings.svg';
import { Button, Layout, Typography } from 'antd';

import styles from './app-header.module.css';

const { Header } = Layout;

export const AppHeader = () => {
    const navigate = useNavigate();

    return (
        <Header className={styles.appHeader}>
            <div
                className={styles.location}
                role='presentation'
                onClick={() => {
                    navigate(Paths.MAIN);
                }}
            >
                Главная
            </div>
            <div className={styles.menu}>
                <Typography.Title className={styles.greetings} level={1}>
                    Приветствуем тебя в CleverFit — приложении,
                    <br />
                    которое поможет тебе добиться своей мечты!
                </Typography.Title>
                <div className={styles.settings}>
                    <Button type='text' className={styles.cardButton}>
                        <img alt='android' src={settingsIcon} className={styles.settingsIcon} />
                        <span>Настройки</span>
                    </Button>
                    <Button type='default' className={styles.settingsMobileButton}>
                        <img src={settingsIcon} alt='settings' />
                    </Button>
                </div>
            </div>
        </Header>
    );
};
