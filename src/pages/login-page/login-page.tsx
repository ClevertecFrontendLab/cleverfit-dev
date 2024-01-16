import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthFieldNames, CredentialsType } from '@common-types/credentials';
import { VALIDATION_FIELD_NOT_REQUIRED, VALIDATION_FIELD_REQUIRED } from '@constants/general';
import { useReturnToken } from '@hooks/use-return-token';
import {
    VALIDATION_CONFIRM_PASSWORD,
    VALIDATION_FIELD_EMAIL,
} from '@pages/login-page/constants/common';
import Google from '@public/google.svg?react';
import { Paths } from '@routes/paths';
import { confirmPasswordValidator } from '@shared/utils/confirm-password-validator';
import { passwordValidator } from '@shared/utils/password-validator';
import { Button, Checkbox, Form, Input } from 'antd';
import classNames from 'classnames';

import { useAuthForm } from './hooks/use-auth-form';

import styles from './login-page.module.css';

export const LoginPage = () => {
    const [errorValidate, setErrorValidate] = useState<
        Record<keyof Omit<CredentialsType, 'remember' | 'confirmPassword'>, boolean>
    >({
        [AuthFieldNames.email]: false,
        [AuthFieldNames.password]: false,
    });

    const { form, onFinish, from, location, isRegistrationPage, onCheckEmail } = useAuthForm();

    const token = useReturnToken();

    const onFieldsChange = () => {
        const errors = form.getFieldsError([AuthFieldNames.email, AuthFieldNames.password]);

        const isErrorEmail = errors[0].errors.length > 0;
        const isErrorPassword = errors[1].errors.length > 0;

        setErrorValidate({
            [AuthFieldNames.email]: isErrorEmail,
            [AuthFieldNames.password]: isErrorPassword,
        });
    };

    const extraPassword = (
        <span
            className={classNames(styles.extra, {
                [styles.extraError]: errorValidate.password,
            })}
        >
            Пароль не менее 8 символов, с заглавной буквой и цифрой
        </span>
    );

    if (token) {
        return <Navigate to={from || Paths.MAIN} state={{ from: location }} />;
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            requiredMark={false}
            onFieldsChange={onFieldsChange}
            scrollToFirstError={true}
            style={{ width: '100%' }}
        >
            <Form.Item name={AuthFieldNames.email} rules={VALIDATION_FIELD_EMAIL}>
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
                    name={AuthFieldNames.confirmPassword}
                    dependencies={[AuthFieldNames.password]}
                    rules={[VALIDATION_CONFIRM_PASSWORD, confirmPasswordValidator]}
                >
                    <Input.Password placeholder='Повторите пароль' />
                </Form.Item>
            )}

            {!isRegistrationPage && (
                <Form.Item
                    rules={[VALIDATION_FIELD_NOT_REQUIRED]}
                    className={styles.rememberWrapper}
                >
                    <Form.Item
                        name={AuthFieldNames.remember}
                        valuePropName='checked'
                        noStyle={true}
                        rules={[VALIDATION_FIELD_NOT_REQUIRED]}
                    >
                        <Checkbox className={styles.rememberMe}>Запомнить меня</Checkbox>
                    </Form.Item>
                    <Button
                        onClick={onCheckEmail}
                        disabled={errorValidate.email}
                        className={styles.forgotPassword}
                    >
                        Забыли пароль?
                    </Button>
                </Form.Item>
            )}

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
