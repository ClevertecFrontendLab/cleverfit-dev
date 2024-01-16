import { useState } from 'react';
import { AppContent } from '@widgets/app-content';
import { AppFooter } from '@widgets/app-footer';
import { AppHeader } from '@widgets/app-header';
import { MobileSideBar } from '@widgets/mobile-side-bar';
import { SideBar } from '@widgets/side-bar';
import { Layout } from 'antd';
import classNames from 'classnames';

import { AppRouter } from './providers/app-router';

import styles from './app.module.css';

export const App = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleMenu = () => {
        setCollapsed((prevState) => !prevState);
    };

    return (
        <Layout className={styles.app} hasSider={true}>
            <SideBar toggleMenu={toggleMenu} collapsed={collapsed} />
            <MobileSideBar />
            <Layout
                className={classNames(styles.appContent, {
                    [styles.appContentCollapsed]: collapsed,
                })}
            >
                <AppHeader />
                <AppContent>
                    <AppRouter />
                    <AppFooter />
                </AppContent>
            </Layout>
        </Layout>
    );
};
