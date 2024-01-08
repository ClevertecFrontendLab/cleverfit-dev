import { PropsWithChildren } from 'react';
import { Layout } from 'antd';
import styles from './app-content.module.css';

const { Content } = Layout;

export const AppContent = ({ children }: PropsWithChildren) => (
    <Content className={styles.appContent}>{children}</Content>
);
