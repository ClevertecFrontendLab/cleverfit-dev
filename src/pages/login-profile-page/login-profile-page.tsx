import { ProfileLayout } from '@components/profile-layout';
import Logo from '@public/logo.svg?react';
import styles from './login-profile-page.module.css';

export const LoginProfilePage = () => {
    return (
        <ProfileLayout>
            <Logo className={styles.logo} />
        </ProfileLayout>
    );
};
