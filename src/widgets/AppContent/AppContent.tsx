import { FC, ReactNode } from 'react';
import { Layout } from 'antd';
import styles from './AppContent.module.css';

const { Content } = Layout;

interface AppContentProps {
    children: ReactNode;
}

export const AppContent: FC<AppContentProps> = ({ children }) => (
    <Content className={styles.AppContent}>{children}</Content>
);
