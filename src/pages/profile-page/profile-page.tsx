import { useCallback, useEffect, useState } from 'react';
import { ProfileFieldNames } from '@common-types/credentials';
import { ModalNotification } from '@components/modal-notification';
import { RequireAuth } from '@components/require-auth';
import { ModalNotificationTheme } from '@constants/modal-notification-theme';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    ProfileAvatar,
    ProfileCredential,
    profileCredentialSelector,
} from '@redux/modules/profile';
import { useUpdateUserMutation } from '@redux/serviсes/profile';
import {
    ValidateFormSubmit,
    ValidationForm,
    ValidationFormAvatar,
    ValidationFormBirthday,
    ValidationFormEmail,
    ValidationFormName,
    ValidationFormPassword,
    ValidationFormRepeatPassword,
    ValidationFormSurname,
} from '@shared/components/validation-form';
import { Form, Typography } from 'antd';
import moment from 'moment';

import styles from './profile-page.module.css';

export const ProfilePage = () => {
    const credential = useAppSelector(profileCredentialSelector);

    const [form] = Form.useForm();
    const [updateUser, { isError }] = useUpdateUserMutation();
    const [showModal, setShowModal] = useState(isError);

    const initialValues = {
        ...credential,
        [ProfileFieldNames.birthday]: moment(credential.birthday),
    };

    useEffect(() => {
        if (isError) setShowModal(true);
    }, [isError]);

    const onFinish = useCallback(
        (credentials: ProfileCredential) => {
            const imgSrc = (credentials.imgSrc as ProfileAvatar).file?.response?.url || '';

            updateUser({ ...credentials, imgSrc });
        },
        [updateUser],
    );

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <RequireAuth>
            <ModalNotification
                textButton='Закрыть'
                onClickButton={handleCloseModal}
                type='error'
                title='При сохранении данных произошла ошибка '
                subtitle='Придётся попробовать ещё раз'
                open={showModal}
                theme={ModalNotificationTheme.ONE_COLOR}
            />
            <div className={styles.back}>
                <ValidationForm
                    className={styles.form}
                    size='large'
                    initialValues={initialValues}
                    form={form}
                    onFinish={onFinish}
                >
                    <fieldset>
                        <legend>
                            <Typography.Title className={styles.title} level={5}>
                                Личная информация
                            </Typography.Title>
                            <div className={styles.group}>
                                <ValidationFormAvatar />
                                <div className={styles.groupFields}>
                                    <ValidationFormName />
                                    <ValidationFormSurname />
                                    <ValidationFormBirthday />
                                </div>
                            </div>
                        </legend>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <Typography.Title className={styles.title} level={5}>
                                Приватность и авторизация
                            </Typography.Title>
                        </legend>
                        <ValidationFormEmail />
                        <ValidationFormPassword withExtra={true} />
                        <ValidationFormRepeatPassword />
                        <ValidateFormSubmit>Сохранить изменения</ValidateFormSubmit>
                    </fieldset>
                </ValidationForm>
            </div>
        </RequireAuth>
    );
};
