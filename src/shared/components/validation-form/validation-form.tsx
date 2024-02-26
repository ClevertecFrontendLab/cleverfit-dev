import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { CalendarTwoTone, PlusOutlined } from '@ant-design/icons';
import { AuthFieldNames, CredentialsType, ProfileFieldNames } from '@common-types/credentials';
import { ModalNotification } from '@components/modal-notification';
import { API_URL, VALIDATION_FIELD_REQUIRED } from '@constants/general';
import { ModalNotificationTheme } from '@constants/modal-notification-theme';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    VALIDATION_CONFIRM_PASSWORD,
    VALIDATION_FIELD_EMAIL,
} from '@pages/login-page/constants/common';
import { useAuthForm } from '@pages/login-page/hooks/use-auth-form';
import { ApiEndpoints } from '@redux/constants/api';
import { accessTokenSelector } from '@redux/modules/app';
import { confirmPasswordValidator } from '@shared/utils/confirm-password-validator';
import { passwordValidator } from '@shared/utils/password-validator';
import { Button, DatePicker, Form, FormInstance, Input, Upload, UploadFile } from 'antd';
import { FormProps } from 'antd/es/form';
import { UploadFileStatus } from 'antd/lib/upload/interface';
import classNames from 'classnames';

import styles from './validation-form.module.css';

type ValidationFormProps = {
    children?: ReactNode;
    className?: string;
    form: FormInstance;
} & FormProps;

type AuthForm = Partial<ReturnType<typeof useAuthForm>>;
type ErrorValidate = Partial<Record<keyof CredentialsType, boolean>>;
type DataTestIdProp = { dataTestId?: string };

const ValidationFormContext = createContext(
    {} as AuthForm & {
        errorValidate: ErrorValidate;
        isTouched: boolean;
    },
);

export const ValidationForm = ({
    children,
    className,
    size,
    initialValues,
    form,
    onFinish,
}: ValidationFormProps) => {
    const [errorValidate, setErrorValidate] = useState<ErrorValidate>({
        [AuthFieldNames.email]: false,
        [AuthFieldNames.password]: false,
    });

    const [isTouched, setIsTouched] = useState(false);

    const onFieldsChange = () => {
        const errors = form.getFieldsError([AuthFieldNames.email, AuthFieldNames.password]);

        const isErrorEmail = errors[0].errors.length > 0;
        const isErrorPassword = errors[1].errors.length > 0;

        setIsTouched(true);

        setErrorValidate({
            [AuthFieldNames.email]: isErrorEmail,
            [AuthFieldNames.password]: isErrorPassword,
        });
    };

    const memoizedContextValue = useMemo(
        () => ({
            form,
            onFinish,
            errorValidate,
            isTouched,
        }),
        [form, onFinish, errorValidate, isTouched],
    );

    return (
        <ValidationFormContext.Provider value={memoizedContextValue}>
            <Form
                name='validateOnly'
                className={className}
                initialValues={initialValues}
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
    <Form.Item name={ProfileFieldNames.name}>
        <Input type='text' placeholder='Имя' data-test-id={dataTestId} />
    </Form.Item>
);

export const ValidationFormSurname = ({ dataTestId }: DataTestIdProp) => (
    <Form.Item name={ProfileFieldNames.surname}>
        <Input type='text' placeholder='Фамилия' data-test-id={dataTestId} />
    </Form.Item>
);

export const ValidationFormBirthday = ({ dataTestId }: DataTestIdProp) => {
    const iconColor = 'rgba(0, 0, 0, 0.25)';

    return (
        <Form.Item name={ProfileFieldNames.birthday}>
            <DatePicker
                className={styles.datepicker}
                placeholder='Дата рождения'
                suffixIcon={<CalendarTwoTone twoToneColor={[iconColor, iconColor]} />}
                data-test-id={dataTestId}
            />
        </Form.Item>
    );
};

const BIG_FILE_MESSAGE = 'Файл слишком большой';

export const ValidationFormAvatar = ({ dataTestId }: DataTestIdProp) => {
    const { form } = useContext(ValidationFormContext);
    const token = useAppSelector(accessTokenSelector);

    const url = form?.getFieldValue(ProfileFieldNames.avatar);
    const initialFile = {
        uid: '1',
        name: 'image.png',
        url: `https://training-api.clevertec.ru${url}`,
    };

    const [fileList, setFileList] = useState<UploadFile[]>(url ? [initialFile] : []);
    const [isBigFile, setIsBigFile] = useState(false);

    const showPreview = !!fileList[0];

    const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        setFileList(newFileList);

        const newFile = newFileList[0];

        if (newFile) {
            if (newFile.status === 'error') {
                const errorFile = {
                    ...initialFile,
                    url: '',
                    status: 'error' as UploadFileStatus,
                };

                setFileList([errorFile]);
            }

            if (newFile.response?.message === BIG_FILE_MESSAGE) {
                setIsBigFile(true);
            }
        }
    };

    const onCloseModal = useCallback(() => setIsBigFile(false), []);

    return (
        <React.Fragment>
            <ModalNotification
                textButton='Закрыть'
                onClickButton={onCloseModal}
                type='error'
                title={BIG_FILE_MESSAGE}
                subtitle='Выберите файл размером менее 5 МБ.'
                open={isBigFile}
                theme={ModalNotificationTheme.ONE_COLOR}
            />
            <Form.Item name={ProfileFieldNames.avatar}>
                <Upload
                    maxCount={1}
                    action={`${API_URL}/${ApiEndpoints.IMAGE}`}
                    headers={{ authorization: `Bearer ${token}` }}
                    listType='picture-card'
                    data-test-id={dataTestId}
                    fileList={fileList}
                    accept='image/*'
                    onChange={handleChange}
                    progress={{ strokeWidth: 4, showInfo: false, size: 'default' }}
                >
                    {!showPreview && <ValidationFormAvatar.UploadBtn />}
                </Upload>
            </Form.Item>
        </React.Fragment>
    );
};

ValidationFormAvatar.UploadBtn = () => (
    <button className={styles.avatarBtn} type='button'>
        <PlusOutlined />
        <div className={styles.avatarBtnText}>Загрузить фото профиля</div>
    </button>
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
}) => {
    const { isTouched } = useContext(ValidationFormContext);

    return (
        <Form.Item className={styles.formItemButton}>
            <Button
                type='primary'
                htmlType='submit'
                className={styles.submitButton}
                data-test-id={dataTestId}
                disabled={!isTouched}
            >
                {children}
            </Button>
        </Form.Item>
    );
};
