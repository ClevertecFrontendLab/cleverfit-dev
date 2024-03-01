import { createContext, ReactNode, useMemo, useState } from 'react';
import { AuthFieldNames, CredentialsType } from '@common-types/credentials';
import { useAuthForm } from '@pages/login-page/hooks/use-auth-form';
import { Form, FormInstance } from 'antd';
import { FormProps } from 'antd/es/form';

type ValidationFormProps = {
    children?: ReactNode;
    className?: string;
    form: FormInstance;
} & FormProps;

type AuthForm = Partial<ReturnType<typeof useAuthForm>>;
type ErrorValidate = Partial<Record<keyof CredentialsType, boolean>>;
export type DataTestIdProp = { dataTestId?: string };

export const ValidationFormContext = createContext(
    {} as AuthForm & {
        errorValidate: ErrorValidate;
        isTouched: boolean;
    },
);

export const ValidationForm = ({
    children,
    className,
    size,
    initialValues,
    form,
    onFinish,
}: ValidationFormProps) => {
    const [errorValidate, setErrorValidate] = useState<ErrorValidate>({
        [AuthFieldNames.email]: false,
        [AuthFieldNames.password]: false,
    });

    const [isTouched, setIsTouched] = useState(false);

    const onFieldsChange = () => {
        const errors = form.getFieldsError([AuthFieldNames.email, AuthFieldNames.password]);

        const isErrorEmail = errors[0].errors.length > 0;
        const isErrorPassword = errors[1].errors.length > 0;

        setIsTouched(true);

        setErrorValidate({
            [AuthFieldNames.email]: isErrorEmail,
            [AuthFieldNames.password]: isErrorPassword,
        });
    };

    const memoizedContextValue = useMemo(
        () => ({
            form,
            onFinish,
            errorValidate,
            isTouched,
        }),
        [form, onFinish, errorValidate, isTouched],
    );

    return (
        <ValidationFormContext.Provider value={memoizedContextValue}>
            <Form
                name='validateOnly'
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
