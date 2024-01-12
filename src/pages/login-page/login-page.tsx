import { Link, Navigate, useLocation } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { useAuthForm } from './hooks/use-auth-form';

import styles from './login-page.module.css';
import { AuthFieldNames } from '../../common-types/credentials';
import Google from '@public/google.svg?react';
import { passwordValidator } from '@pages/login-page/helpers/password-validator';
import {
    ACCESS_TOKEN_NAME,
    VALIDATION_FIELD_NOT_REQUIRED,
    VALIDATION_FIELD_REQUIRED,
} from '@constants/general';
import {
    VALIDATION_CONFIRM_PASSWORD,
    VALIDATION_FIELD_EMAIL,
} from '@pages/login-page/constants/common';
import { confirmPasswordValidator } from '@pages/login-page/helpers/confirm-password-validator';
import { TabName } from '@pages/login-profile-page/constants/tab-name';
import { Paths } from '../../routes/paths';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { accessTokenSelector, setAccessToken } from '@redux/modules/app';
import { LocationStateType } from '../../common-types/location';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export const LoginPage = () => {
    const dispatch = useDispatch();
    const [errorPassword, setErrorPassword] = useState(false);
    const token = useAppSelector(accessTokenSelector);
    const location = useLocation();
    const isRegistrationPage = location.pathname.includes(TabName.registration);
    const { form, onFinish } = useAuthForm(isRegistrationPage);
    console.log(errorPassword, 'errorPassword2');
    const extraPassword = (
        <span
            className={classNames(styles.extra, {
                [styles.extraError]: errorPassword,
            })}
        >
            Пароль не менее 8 символов, с заглавной буквой и цифрой
        </span>
    );

    const onFieldsChange = () => {
        const errors = form.getFieldsError([AuthFieldNames.password]);
        const isErrorPassword = errors[0].errors.length > 0;
        setErrorPassword(isErrorPassword);
    };

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN_NAME);
        if (token) {
            dispatch(setAccessToken(token));
        }
    }, [dispatch]);

    if (token) {
        const state = location.state as LocationStateType;
        const { from } = state ?? {};

        return <Navigate to={from ? from : Paths.MAIN} state={{ from: location }} />;
    }
    return (
        <Form
            form={form}
            onFinish={onFinish}
            requiredMark={false}
            scrollToFirstError
            onFieldsChange={onFieldsChange}
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
                    rules={[VALIDATION_CONFIRM_PASSWORD, confirmPasswordValidator]}
                >
                    <Input.Password placeholder='Повторите пароль' />
                </Form.Item>
            )}

            <Form.Item rules={[VALIDATION_FIELD_NOT_REQUIRED]} className={styles.rememberWrapper}>
                <Form.Item
                    name={AuthFieldNames.remember}
                    valuePropName='checked'
                    noStyle
                    rules={[VALIDATION_FIELD_NOT_REQUIRED]}
                >
                    <Checkbox className={styles.rememberMe}>Запомнить меня</Checkbox>
                </Form.Item>
                {!isRegistrationPage && (
                    <Link className={styles.forgotPassword} to={'/'}>
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
