import { useCallback, useEffect } from 'react';
import { ProfileFieldNames } from '@common-types/credentials';
import { RequireAuth } from '@components/require-auth';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    ProfileAvatar,
    ProfileCredential,
    profileCredentialSelector,
    profileIsLoadedSelector,
} from '@redux/modules/profile';
import { useLazyGetUserQuery, useUpdateUserMutation } from '@redux/serviсes/profile';
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
} from '@shared/components/validation-form/validation-form';
import { Form, Typography } from 'antd';
import moment from 'moment';

import styles from './profile-page.module.css';

export const ProfilePage = () => {
    const credential = useAppSelector(profileCredentialSelector);
    const isLoaded = useAppSelector(profileIsLoadedSelector);

    const [form] = Form.useForm();
    const [getUser, { isUninitialized }] = useLazyGetUserQuery();
    const [updateUser] = useUpdateUserMutation();

    const initialValues = {
        ...credential,
        [ProfileFieldNames.birthday]: moment(credential.birthday),
    };

    useEffect(() => {
        if (isUninitialized) {
            getUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onFinish = useCallback(
        (credentials: ProfileCredential) => {
            const imgSrc = (credentials.imgSrc as ProfileAvatar).file?.response?.url;

            updateUser({ ...credentials, imgSrc });
        },
        [updateUser],
    );

    return (
        <RequireAuth>
            <div className={styles.back}>
                {isLoaded && (
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
                )}
            </div>
        </RequireAuth>
    );
};
