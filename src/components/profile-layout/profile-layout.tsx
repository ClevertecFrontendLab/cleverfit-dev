import { FC, PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './profile-layout.module.css';
import { CustomSpace } from '@shared/components/custom-space';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appSelector } from '@redux/modules/app';
import classNames from 'classnames';

export const ProfileLayout: FC<PropsWithChildren> = ({ children }) => {
    const { isLoading } = useAppSelector(appSelector);

    return (
        <CustomSpace className={classNames(styles.wrapper, { [styles.blurWrapper]: isLoading })}>
            <CustomSpace
                size={48}
                align='center'
                direction='vertical'
                className={styles.loginWrapper}
            >
                {children}
                <Outlet />
            </CustomSpace>
        </CustomSpace>
    );
};