import { useEffect } from 'react';
import { RequireAuth } from '@components/require-auth';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { profileCredentialSelector } from '@redux/modules/profile';
import { useLazyGetUserQuery } from '@redux/serviсes/profile';
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

import styles from './profile-page.module.css';

export const ProfilePage = () => {
    const credential = useAppSelector(profileCredentialSelector);
    const [form] = Form.useForm();
    const [getUser, { isUninitialized, isSuccess }] = useLazyGetUserQuery();

    useEffect(() => {
        if (isUninitialized) {
            getUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <RequireAuth>
            <div className={styles.back}>
                {isSuccess && (
                    <ValidationForm
                        className={styles.form}
                        size='large'
                        initialValues={credential}
                        form={form}
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
