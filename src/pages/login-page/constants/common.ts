import { RuleObject } from 'antd/es/form';

export const VALIDATION_FIELD_EMAIL = [
    {
        type: 'email',
        message: '',
    },
    {
        required: true,
        message: '',
    },
] as Array<RuleObject>;

export const VALIDATION_CONFIRM_PASSWORD = { required: true, message: '' };
