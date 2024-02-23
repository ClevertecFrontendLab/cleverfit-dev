import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { CalendarTwoTone, PlusOutlined } from '@ant-design/icons';
import { AuthFieldNames, CredentialsType } from '@common-types/credentials';
import { VALIDATION_FIELD_REQUIRED } from '@constants/general';
import {
    VALIDATION_CONFIRM_PASSWORD,
    VALIDATION_FIELD_EMAIL,
} from '@pages/login-page/constants/common';
import { useAuthForm } from '@pages/login-page/hooks/use-auth-form';
import { confirmPasswordValidator } from '@shared/utils/confirm-password-validator';
import { passwordValidator } from '@shared/utils/password-validator';
import { Button, DatePicker, Form, Input, Upload } from 'antd';
import { FormProps } from 'antd/es/form';
import classNames from 'classnames';

import styles from './validation-form.module.css';

type ValidationFormProps = {
    children?: ReactNode;
    className?: string;
} & FormProps;

type AuthForm = Partial<ReturnType<typeof useAuthForm>>;

type ErrorValidate = Partial<Record<keyof CredentialsType, boolean>>;

type DataTestIdProp = { dataTestId?: string };

const ValidationFormContext = createContext(
    {} as AuthForm & {
        errorValidate: ErrorValidate;
    },
);

export const ValidationForm = ({ children, className, size }: ValidationFormProps) => {
    const [errorValidate, setErrorValidate] = useState<ErrorValidate>({
        [AuthFieldNames.email]: false,
        [AuthFieldNames.password]: false,
    });

    const { form, onFinish, onCheckEmail } = useAuthForm();

    const onFieldsChange = () => {
        const errors = form.getFieldsError([AuthFieldNames.email, AuthFieldNames.password]);

        const isErrorEmail = errors[0].errors.length > 0;
        const isErrorPassword = errors[1].errors.length > 0;

        setErrorValidate({
            [AuthFieldNames.email]: isErrorEmail,
            [AuthFieldNames.password]: isErrorPassword,
        });
    };

    const memoizedContextValue = useMemo(
        () => ({
            form,
            onFinish,
            onCheckEmail,
            errorValidate,
        }),
        [form, onFinish, onCheckEmail, errorValidate],
    );

    return (
        <ValidationFormContext.Provider value={memoizedContextValue}>
            <Form
                className={className}
                form={form}
                onFinish={onFinish}
                requiredMark={false}
                onFieldsChange={onFieldsChange}
                scrollToFirstError={true}
                size={size}
            >
                {children}
            </Form>
        </ValidationFormContext.Provider>
    );
};

export const ValidationFormName = ({ dataTestId }: DataTestIdProp) => (
    <Form.Item>
        <Input type='text' placeholder='Имя' data-test-id={dataTestId} />
    </Form.Item>
);

export const ValidationFormSurname = ({ dataTestId }: DataTestIdProp) => (
    <Form.Item>
        <Input type='text' placeholder='Фамилия' data-test-id={dataTestId} />
    </Form.Item>
);

export const ValidationFormBirthday = ({ dataTestId }: DataTestIdProp) => {
    const iconColor = 'rgba(0, 0, 0, 0.25)';

    return (
        <Form.Item>
            <DatePicker
                className={styles.datepicker}
                placeholder='Дата рождения'
                suffixIcon={<CalendarTwoTone twoToneColor={[iconColor, iconColor]} />}
                data-test-id={dataTestId}
            />
        </Form.Item>
    );
};

export const ValidationFormAvatar = ({ dataTestId }: DataTestIdProp) => (
    <Form.Item>
        <Upload action='/upload.do' listType='picture-card' data-test-id={dataTestId}>
            <button style={{ border: 0, background: 'none' }} type='button'>
                <PlusOutlined />
                <div>Загрузить фото профиля</div>
            </button>
        </Upload>
    </Form.Item>
);

export const ValidationFormEmail = ({ dataTestId }: DataTestIdProp) => (
    <Form.Item name={AuthFieldNames.email} rules={VALIDATION_FIELD_EMAIL}>
        <Input addonBefore='e-mail:' type='email' data-test-id={dataTestId} />
    </Form.Item>
);

export const ValidationFormPassword = ({
    dataTestId,
    withExtra,
}: DataTestIdProp & {
    withExtra?: boolean;
}) => {
    const { errorValidate } = useContext(ValidationFormContext);

    const extraPassword = (
        <span
            className={classNames(styles.extra, {
                [styles.extraError]: errorValidate.password,
            })}
        >
            Пароль не менее 8 символов, с заглавной буквой и цифрой
        </span>
    );

    return (
        <Form.Item
            name={AuthFieldNames.password}
            className={styles.formItemInput}
            extra={withExtra && extraPassword}
            rules={[VALIDATION_FIELD_REQUIRED, passwordValidator]}
        >
            <Input.Password type='password' placeholder='Пароль' data-test-id={dataTestId} />
        </Form.Item>
    );
};

export const ValidationFormRepeatPassword = ({ dataTestId }: DataTestIdProp) => (
    <Form.Item
        name={AuthFieldNames.confirmPassword}
        dependencies={[AuthFieldNames.password]}
        rules={[VALIDATION_CONFIRM_PASSWORD, confirmPasswordValidator]}
    >
        <Input.Password placeholder='Повторите пароль' data-test-id={dataTestId} />
    </Form.Item>
);

export const ValidateFormSubmit = ({
    dataTestId,
    children,
}: DataTestIdProp & {
    children: ReactNode | string;
}) => (
    <Form.Item className={styles.formItemButton}>
        <Button
            type='primary'
            htmlType='submit'
            block={true}
            className={styles.submitButton}
            data-test-id={dataTestId}
        >
            {children}
        </Button>
    </Form.Item>
);
