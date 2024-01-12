import styles from './main-layout.module.css';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { RequireAuth } from '@components/require-auth';
import { SideBar } from '@widgets/side-bar';
import { useState } from 'react';
import classNames from 'classnames';
import { MobileSideBar } from '@widgets/mobile-side-bar';
import { AppHeader } from '@widgets/app-header';
import { AppFooter } from '@widgets/app-footer';

const { Content } = Layout;

export const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleMenu = () => {
        setCollapsed((collapsed) => !collapsed);
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
