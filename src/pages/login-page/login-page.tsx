import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { AuthFieldNames } from '@common-types/credentials';
import { LocationStateType } from '@common-types/location';
import {
    ACCESS_TOKEN_NAME,
    VALIDATION_FIELD_NOT_REQUIRED,
    VALIDATION_FIELD_REQUIRED,
} from '@constants/general';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { VALIDATION_FIELD_EMAIL } from '@pages/login-page/constants/common';
import { confirmPasswordValidator } from '@pages/login-page/helpers/confirm-password-validator';
import { passwordValidator } from '@pages/login-page/helpers/password-validator';
import { TabName } from '@pages/login-profile-page/constants/tab-name';
import Google from '@public/google.svg?react';
import { accessTokenSelector, setAccessToken } from '@redux/modules/app';
import { Paths } from '@routes/paths';
import { Button, Checkbox, Form, Input } from 'antd';

import { useAuthForm } from './hooks/use-auth-form';

import styles from './login-page.module.css';

export const LoginPage = () => {
    const dispatch = useDispatch();
    const token = useAppSelector(accessTokenSelector);
    const location = useLocation();
    const isRegistrationPage = location.pathname.includes(TabName.registration);
    const { form, onFinish } = useAuthForm(isRegistrationPage);

    const extraPassword = (
        <span className={styles.extra}>
            Пароль не менее 8 символов, с заглавной буквой и цифрой
        </span>
    );

    useEffect(() => {
        const isTokenAlive = localStorage.getItem(ACCESS_TOKEN_NAME);

        if (isTokenAlive) {
            dispatch(setAccessToken(isTokenAlive));
        }
    }, [dispatch]);

    if (token) {
        const state = location.state as LocationStateType;
        const { from } = state ?? {};

        return <Navigate to={from || Paths.MAIN} state={{ from: location }} />;
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            requiredMark={false}
            scrollToFirstError={true}
            style={{ width: '100%' }}
        >
            <Form.Item
                name={AuthFieldNames.email}
                rules={isRegistrationPage ? VALIDATION_FIELD_EMAIL : [VALIDATION_FIELD_REQUIRED]}
            >
                <Input addonBefore='e-mail:' type='email' />
            </Form.Item>

            <Form.Item
                name={AuthFieldNames.password}
                className={styles.formItemInput}
                extra={isRegistrationPage && extraPassword}
                rules={
                    isRegistrationPage
                        ? [VALIDATION_FIELD_REQUIRED, passwordValidator]
                        : [VALIDATION_FIELD_REQUIRED]
                }
            >
                <Input.Password type='password' placeholder='Пароль' />
            </Form.Item>

            {isRegistrationPage && (
                <Form.Item
                    name={AuthFieldNames.confirm}
                    dependencies={[AuthFieldNames.password]}
                    hasFeedback={true}
                    rules={[VALIDATION_FIELD_REQUIRED, confirmPasswordValidator]}
                >
                    <Input.Password placeholder='Повторите пароль' />
                </Form.Item>
            )}

            <Form.Item rules={[VALIDATION_FIELD_NOT_REQUIRED]} className={styles.rememberWrapper}>
                <Form.Item
                    name={AuthFieldNames.remember}
                    valuePropName='checked'
                    noStyle={true}
                    rules={[VALIDATION_FIELD_NOT_REQUIRED]}
                >
                    <Checkbox className={styles.rememberMe}>Запомнить меня</Checkbox>
                </Form.Item>
                {!isRegistrationPage && (
                    <Link className={styles.forgotPassword} to='/'>
                        Забыли пароль?
                    </Link>
                )}
            </Form.Item>

            <Form.Item className={styles.formItemButton}>
                <Button
                    type='primary'
                    htmlType='submit'
                    block={true}
                    className={styles.submitButton}
                >
                    Войти
                </Button>
            </Form.Item>

            <Form.Item className={styles.formItemGoogleButton}>
                <Button
                    type='primary'
                    htmlType='submit'
                    block={true}
                    className={styles.googleButton}
                >
                    <div className={styles.googleButtonContainer}>
                        <Google className={styles.googleButtonIcon} />
                        <span className={styles.googleText}>Регистрация через Google</span>
                    </div>
                </Button>
            </Form.Item>
        </Form>
    );
};
