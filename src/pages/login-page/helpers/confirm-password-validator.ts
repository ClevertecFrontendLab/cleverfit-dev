import { FormInstance } from 'antd';
import { RuleObject } from 'antd/es/form';
import { StoreValue } from 'rc-field-form/lib/interface';

export const confirmPasswordValidator = ({
    getFieldValue,
}: Omit<FormInstance, 'scrollToField' | 'getFieldInstance'>) => ({
    validator(_: RuleObject, value: StoreValue) {
        if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
        }
        return Promise.reject();
    },
});
