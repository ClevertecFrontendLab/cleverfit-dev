import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { RequireAuth } from '@components/require-auth';
import { AppFooter } from '@widgets/app-footer';
import { AppHeader } from '@widgets/app-header';
import { MobileSideBar } from '@widgets/mobile-side-bar';
import { SideBar } from '@widgets/side-bar';
import { Layout } from 'antd';
import classNames from 'classnames';

import styles from './main-layout.module.css';

const { Content } = Layout;

export const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleMenu = () => {
        setCollapsed((prevState) => !prevState);
    };

    return (
        <RequireAuth>
            <Layout className={styles.app}>
                <SideBar toggleMenu={toggleMenu} collapsed={collapsed} />
                <MobileSideBar />
                <Layout
                    className={classNames(styles.appContent, {
                        [styles.appContentCollapsed]: collapsed,
                    })}
                >
                    <AppHeader />
                    <Content className={styles.content}>
                        <Outlet />
                    </Content>
                    <AppFooter />
                </Layout>
            </Layout>
        </RequireAuth>
    );
};
