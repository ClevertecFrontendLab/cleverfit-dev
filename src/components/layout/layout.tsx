import { Outlet } from 'react-router-dom';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';

export const Layout = () => (
    <ErrorBoundary>
        <Outlet />
    </ErrorBoundary>
);
