import { FormInstance } from 'antd';
import { RuleObject } from 'antd/es/form';
import { StoreValue } from 'rc-field-form/lib/interface';

export const confirmPasswordValidator = ({
    getFieldValue,
}: Omit<FormInstance, 'scrollToField' | 'getFieldInstance'>) => {
    const style: React.CSSProperties = {
        font: 'var(--font-xs)',
    };
    return {
        validator(_: RuleObject, value: StoreValue) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(<span style={style}>Пароли не совпадают</span>);
        },
    };
};
