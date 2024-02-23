import { Link, useLocation } from 'react-router-dom';
import { Paths } from '@routes/paths';
import settingsIcon from '@shared/assets/icons/buttons/icon-settings.svg';
import { Breadcrumb, Button, Layout, Typography } from 'antd';
import classNames from 'classnames';

import styles from './app-header.module.css';

const { Header } = Layout;

export const AppHeader = () => {
    const { pathname } = useLocation();
    const isMainPage = pathname === Paths.MAIN;
    const isReviewPage = pathname === Paths.REVIEWS;
    const isProfilePage = pathname === `/${Paths.PROFILE}`;

    return (
        <Header className={classNames(styles.appHeader, { [styles.menuNoMain]: !isMainPage })}>
            {!isProfilePage && (
                <AppHeader.Breadcrumb>
                    {isReviewPage && (
                        <Breadcrumb.Item>
                            <Link to={Paths.REVIEWS}>Отзывы пользователей</Link>
                        </Breadcrumb.Item>
                    )}
                </AppHeader.Breadcrumb>
            )}
            {isMainPage && (
                <div className={styles.menu}>
                    <Typography.Title className={styles.greetings} level={1}>
                        Приветствуем тебя в CleverFit — приложении,
                        <br />
                        которое поможет тебе добиться своей мечты!
                    </Typography.Title>
                    <AppHeader.Settings />
                </div>
            )}
            {isProfilePage && (
                <div className={styles.profile}>
                    <Typography.Title level={4}>Профиль</Typography.Title>
                    <AppHeader.Settings />
                </div>
            )}
        </Header>
    );
};

AppHeader.Breadcrumb = ({ children }: { children?: JSX.Element | boolean }) => (
    <Breadcrumb>
        <Breadcrumb.Item>
            <Link to={Paths.MAIN}>Главная</Link>
        </Breadcrumb.Item>
        {children}
    </Breadcrumb>
);

AppHeader.Settings = () => (
    <div className={styles.settings}>
        <Button type='text' className={styles.cardButton}>
            <img alt='android' src={settingsIcon} className={styles.settingsIcon} />
            <span>Настройки</span>
        </Button>
        <Button type='default' className={styles.settingsMobileButton}>
            <img src={settingsIcon} alt='settings' />
        </Button>
    </div>
);
