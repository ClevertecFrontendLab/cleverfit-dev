import { useState } from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';
import { AppRouter } from './providers/AppRouter';
import { SideBar } from '@widgets/SideBar';
import { AppHeader } from '@widgets/AppHeader';
import { AppContent } from '@widgets/AppContent';
import { AppFooter } from '@widgets/AppFooter';
import { MobileSideBar } from '@widgets/MobileSideBar';
import styles from './App.module.css';

export const App = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [collapsedMobile, setCollapsedMobile] = useState(true);

    const toggleMenu = () => {
        setCollapsed(!collapsed);
        setCollapsedMobile(!collapsedMobile);
    };

    return (
        <Layout className={styles.app} hasSider>
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
