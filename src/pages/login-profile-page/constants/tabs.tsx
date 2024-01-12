import { TabType } from '@components/profile-tabs/types/tabs';
import { TabName } from '@pages/login-profile-page/constants/tab-name';
import { LoginPage } from '@pages/login-page';

export const tabs: Array<TabType<TabName>> = [
    {
        key: TabName.login,
        label: 'Вход',
        children: <LoginPage />,
    },
    {
        key: TabName.registration,
        label: 'Регистрация',
        children: <LoginPage />,
    },
];
