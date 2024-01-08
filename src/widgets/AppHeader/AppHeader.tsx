import { Button, Layout } from 'antd';
import settingsIcon from '@shared/assets/icons/buttons/icon-settings.svg';
import settingsLightIcon from '@shared/assets/icons/buttons/icon-settings-light.svg';
import styles from './AppHeader.module.css';

const { Header } = Layout;

export const AppHeader = () => (
    <Header className={styles.Header}>
        <div className={styles.location}>Главная</div>
        <div className={styles.menu}>
            <h1 className={styles.greetings}>
                Приветствуем тебя в CleverFit — приложении,
                <br />
                которое поможет тебе добиться своей мечты!
            </h1>
            <div className={styles.settings}>
                <Button type='text' className={styles.cardButton}>
                    <img alt='android' src={settingsIcon} className={styles.settingsIcon} />
                    <span>Настройки</span>
                </Button>
                <Button type='primary' className={styles.settingsMobileButton}>
                    <img src={settingsLightIcon} alt='settings' />
                </Button>
            </div>
        </div>
    </Header>
);