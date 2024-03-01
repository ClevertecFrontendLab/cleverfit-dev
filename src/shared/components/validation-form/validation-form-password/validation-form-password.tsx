import { useContext } from 'react';
import { AuthFieldNames } from '@common-types/credentials';
import { VALIDATION_FIELD_REQUIRED } from '@constants/general';
import { passwordValidator } from '@shared/utils/password-validator';
import { Form, Input } from 'antd';
import classNames from 'classnames';

import { DataTestIdProp, ValidationFormContext } from '../validation-form';

import styles from './validation-form-password.module.css';

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
            className={styles.formItemInput}
            name={AuthFieldNames.password}
            extra={withExtra && extraPassword}
            rules={[VALIDATION_FIELD_REQUIRED, passwordValidator]}
        >
            <Input.Password type='password' placeholder='Пароль' data-test-id={dataTestId} />
        </Form.Item>
    );
};
