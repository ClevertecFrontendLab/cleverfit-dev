import { RequireAuth } from '@components/require-auth';
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
import { Typography } from 'antd';

import styles from './profile-page.module.css';

export const ProfilePage = () => (
    <RequireAuth>
        <div className={styles.back}>
            <ValidationForm className={styles.form} size='large'>
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
