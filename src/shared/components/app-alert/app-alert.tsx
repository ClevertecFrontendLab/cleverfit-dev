import { useCallback, useEffect } from 'react';
import { Portal } from '@components/portal';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { alertSelector, setAppAlert } from '@redux/modules/app';
import { Alert } from 'antd';

import styles from './app-alert.module.css';

export const AppAlert = () => {
    const dispatch = useAppDispatch();
    const alert = useAppSelector(alertSelector);
    let timerId: any;
    const { message, type } = alert;

    const handleClose = useCallback(() => {
        dispatch(
            setAppAlert({
                message: '',
                type: undefined,
            }),
        );
    }, [dispatch]);

    if (alert.type) {
        timerId = setTimeout(() => {
            handleClose();
        }, 2000);
    }

    useEffect(() => () => clearTimeout(timerId), [timerId, alert]);

    if (!alert.type) return null;

    return (
        <Portal>
            <div className={styles.wrapper}>
                <Alert
                    data-test-id='alert'
                    className={styles.alert}
                    message={message}
                    type={type}
                    showIcon={true}
                    closable={true}
                    onClose={handleClose}
                    afterClose={handleClose}
                />
            </div>
        </Portal>
    );
};
