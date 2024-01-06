import { useState } from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';
import { AppRouter } from './providers/AppRouter';
import { SideBar } from '@widgets/SideBar';
import { AppHeader } from '@widgets/AppHeader';
import { AppContent } from '@widgets/AppContent';
import { AppFooter } from '@widgets/AppFooter';
import styles from './App.module.css';

export const App = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className={styles.app} hasSider>
            <SideBar setCollapsed={setCollapsed} collapsed={collapsed} />
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
