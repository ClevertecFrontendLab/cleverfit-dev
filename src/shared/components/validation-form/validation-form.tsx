import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { CalendarTwoTone, PlusOutlined } from '@ant-design/icons';
import { AuthFieldNames, CredentialsType, ProfileFieldNames } from '@common-types/credentials';
import { API_URL, VALIDATION_FIELD_REQUIRED } from '@constants/general';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    VALIDATION_CONFIRM_PASSWORD,
    VALIDATION_FIELD_EMAIL,
} from '@pages/login-page/constants/common';
import { useAuthForm } from '@pages/login-page/hooks/use-auth-form';
import { accessTokenSelector } from '@redux/modules/app';
import { useCreateAvatarMutation } from '@redux/serviсes/profile';
import { confirmPasswordValidator } from '@shared/utils/confirm-password-validator';
import { passwordValidator } from '@shared/utils/password-validator';
import { Button, DatePicker, Form, FormInstance, Input, Progress, Upload, UploadFile } from 'antd';
import { FormProps } from 'antd/es/form';
import classNames from 'classnames';

import styles from './validation-form.module.css';

type ValidationFormProps = {
    children?: ReactNode;
    className?: string;
    onCheckEmail?: () => void;
    form: FormInstance;
} & FormProps;

type AuthForm = Partial<ReturnType<typeof useAuthForm>>;
type ErrorValidate = Partial<Record<keyof CredentialsType, boolean>>;
type DataTestIdProp = { dataTestId?: string };

const ValidationFormContext = createContext(
    {} as AuthForm & {
        errorValidate: ErrorValidate;
    },
);

export const ValidationForm = ({
    children,
    className,
    size,
    initialValues,
    form,
    onFinish,
    onCheckEmail,
}: ValidationFormProps) => {
    const [errorValidate, setErrorValidate] = useState<ErrorValidate>({
        [AuthFieldNames.email]: false,
        [AuthFieldNames.password]: false,
    });

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

export const ValidationFormAvatar = ({ dataTestId }: DataTestIdProp) => {
    const { form } = useContext(ValidationFormContext);
    const accessToken = useAppSelector(accessTokenSelector);

    const url = form?.getFieldValue(ProfileFieldNames.avatar);
    const initialFile = {
        uid: '1',
        name: 'image.png',
        url: 'https://marathon-api.clevertec.ru/media/avatar/65d79d52ff8f5241f9a32406.png',
    };

    const [fileList, setFileList] = useState<UploadFile[]>([initialFile]);
    const [createAvatar, { isLoading, startedTimeStamp, fulfilledTimeStamp }] =
        useCreateAvatarMutation();

    const showPreview = !!fileList[0];

    const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) =>
        setFileList(newFileList);

    const handleUpload = async ({ onError, file, onProgress }: UploadRequestOption<any>) => {
        const formData = new FormData();

        formData.append('file', file);

        onProgress({ percent: 'auto' }, file);

        // /media/avatar/65d79d52ff8f5241f9a32406.png

        // const { data } = await createAvatar(formData).catch(() => onError());

        // console.log(startedTimeStamp)2

        const { data } = {
            data: {
                uid: '1',
                name: 'avatar',
                url: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/01/goku-and-shonen-manga.jpg',
            },
        };

        setFileList(() => [{ ...initialFile, url: `${data.url}` }]);

        onProgress({ percent: 50 }, file);
    };

    return (
        <Form.Item name={ProfileFieldNames.avatar}>
            <Upload
                headers={{ authorization: `Bearer ${accessToken}` }}
                maxCount={1}
                listType='picture-card'
                data-test-id={dataTestId}
                fileList={fileList}
                accept='image/*'
                customRequest={handleUpload}
                onChange={handleChange}
                progress={{ strokeWidth: 4, showInfo: false, size: 'default' }}
            >
                {!showPreview && <ValidationFormAvatar.UploadBtn />}
            </Upload>
        </Form.Item>
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
}) => (
    <Form.Item className={styles.formItemButton}>
        <Button
            type='primary'
            htmlType='submit'
            className={styles.submitButton}
            data-test-id={dataTestId}
        >
            {children}
        </Button>
    </Form.Item>
);
