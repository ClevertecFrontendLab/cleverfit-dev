import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthFieldNames, CredentialsType } from '@common-types/credentials';
import { ACCESS_TOKEN_NAME, EMAIL } from '@constants/general';
import { HttpStatus } from '@constants/http-status';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useLastPartUrl } from '@hooks/use-last-part-url';
import { NamePages } from '@pages/login-page/hooks/constants/name-pages';
import {
    credentialSelector,
    errorSelector,
    setAccessToken,
    setAppCredential,
    setAppIsError,
} from '@redux/modules/app';
import {
    useChangePasswordMutation,
    useCheckEmailMutation,
    useLoginMutation,
    useRegistrationMutation,
} from '@redux/serviсes/auth';
import { ApiErrorResponse } from '@redux/types/api';
import { Paths } from '@routes/paths';
import { Form } from 'antd';

export const useAuthForm = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { lastPartUrl, from, location } = useLastPartUrl();
    const isRequestPendingRef = useRef(false);
    const credential = useAppSelector(credentialSelector);
    const { remember, email } = credential;
    const isError = useAppSelector(errorSelector);

    const [login, { isError: isErrorLogin, isSuccess: isSuccessLogin, data: response }] =
        useLoginMutation();
    const [
        registration,
        {
            isError: isErrorRegistration,
            isSuccess: isSuccessRegistration,
            error: errorRegistration,
        },
    ] = useRegistrationMutation();

    const [changePassword, { isError: isErrorChangePassword, isSuccess: isSuccessChangePassword }] =
        useChangePasswordMutation();

    const [checkEmail] = useCheckEmailMutation();

    const isRegistrationPage = lastPartUrl && lastPartUrl === NamePages.REGISTRATION;
    const isChangePasswordPage = lastPartUrl && lastPartUrl === NamePages.CHANGE_PASSWORD;

    const onCheckEmail = useCallback(() => {
        const emailField = form.getFieldValue(AuthFieldNames.email);

        if (emailField) {
            checkEmail({ email: emailField, message: '' });
            localStorage.setItem(EMAIL, emailField);
            navigate(Paths.CONFIRM_EMAIL, { state: { from: location } });
        }
    }, [checkEmail, form, location, navigate]);

    const onFinish = useCallback(
        (credentials: CredentialsType) => {
            const { email, password, confirmPassword } = { ...credentials };

            if (isRegistrationPage) {
                registration({ email, password });
            }
            if (isChangePasswordPage) {
                changePassword({ password, confirmPassword });
                dispatch(setAppCredential(credentials));
            }
            if (!isRegistrationPage && !isChangePasswordPage) {
                login({ email, password });
                dispatch(setAppCredential(credentials));
            }
        },
        [changePassword, dispatch, isChangePasswordPage, isRegistrationPage, login, registration],
    );
    const data = (errorRegistration as ApiErrorResponse)?.data;

    useEffect(() => {
        const cameFromLocation =
            from?.pathname === `${Paths.RESULT}/${Paths.ERROR}` ||
            from?.pathname === `${Paths.RESULT}/${Paths.ERROR_CHANGE_PASSWORD}`;

        if (cameFromLocation && isError && !isRequestPendingRef.current) {
            onFinish(credential);
            isRequestPendingRef.current = true;
        }
    }, [credential, from?.pathname, isError, location.state, onFinish]);

    useEffect(() => {
        if (isSuccessRegistration) {
            dispatch(setAppIsError(false));
            navigate(`${Paths.RESULT}/${Paths.SUCCESS}`, { state: { from: location } });
            localStorage.setItem(EMAIL, email);
        }
        if (isErrorRegistration && data?.statusCode === HttpStatus.CONFLICT) {
            navigate(`${Paths.RESULT}/${Paths.ERROR_409}`, { state: { from: location } });
        }
        if (isErrorRegistration && data?.statusCode !== HttpStatus.CONFLICT) {
            dispatch(setAppIsError(true));
            navigate(`${Paths.RESULT}/${Paths.ERROR}`, { state: { from: location } });
        }
        if (isErrorLogin) {
            navigate(`${Paths.RESULT}/${Paths.ERROR_LOGIN}`, { state: { from: location } });
        }
        if (isSuccessLogin) {
            if (remember) {
                localStorage.setItem(ACCESS_TOKEN_NAME, response?.accessToken ?? '');
            }
            dispatch(setAccessToken(response?.accessToken ?? ''));
        }
        if (isErrorChangePassword) {
            dispatch(setAppIsError(true));
            navigate(`${Paths.RESULT}/${Paths.ERROR_CHANGE_PASSWORD}`, {
                state: { from: location },
            });
        }
        if (isSuccessChangePassword) {
            dispatch(setAppIsError(false));
            navigate(`${Paths.RESULT}/${Paths.SUCCESS_CHANGE_PASSWORD}`, {
                state: { from: location },
            });
        }
    }, [
        remember,
        data?.statusCode,
        dispatch,
        isErrorLogin,
        isErrorRegistration,
        isErrorChangePassword,
        isSuccessLogin,
        isSuccessRegistration,
        location,
        navigate,
        response?.accessToken,
        isSuccessChangePassword,
        email,
    ]);

    return {
        onFinish,
        form,
        location,
        from,
        isRegistrationPage,
        onCheckEmail,
    };
};
