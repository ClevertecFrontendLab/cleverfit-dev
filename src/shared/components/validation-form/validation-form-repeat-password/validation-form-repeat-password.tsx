import { AuthFieldNames } from '@common-types/credentials';
import { VALIDATION_CONFIRM_PASSWORD } from '@pages/login-page/constants/common';
import { confirmPasswordValidator } from '@shared/utils/confirm-password-validator';
import { Form, Input } from 'antd';

import { DataTestIdProp } from '../validation-form';

export const ValidationFormRepeatPassword = ({ dataTestId }: DataTestIdProp) => (
    <Form.Item
        name={AuthFieldNames.confirmPassword}
        dependencies={[AuthFieldNames.password]}
        rules={[VALIDATION_CONFIRM_PASSWORD, confirmPasswordValidator]}
    >
        <Input.Password placeholder='Повторите пароль' data-test-id={dataTestId} />
    </Form.Item>
);
