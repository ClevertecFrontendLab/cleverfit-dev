import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CredentialsType } from '@common-types/credentials';
import { LocationStateType } from '@common-types/location';
import { ACCESS_TOKEN_NAME } from '@constants/general';
import { HttpStatus } from '@constants/http-status';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    credentialSelector,
    errorSelector,
    setAccessToken,
    setAppCredential,
    setAppIsError,
} from '@redux/modules/app';
import { useLoginMutation, useRegistrationMutation } from '@redux/serviсes/auth';
import { ApiErrorResponse } from '@redux/types/api';
import { Paths } from '@routes/paths';
import { Form } from 'antd';

export const useAuthForm = (isRegistrationPage: boolean) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isFailedRegistration = useRef(false);
    const credential = useAppSelector(credentialSelector);
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
    const [form] = Form.useForm();

    const onFinish = useCallback(
        (credentials: CredentialsType) => {
            const { email, password } = { ...credentials };

            if (isRegistrationPage) {
                registration({ email, password });
            } else {
                login({ email, password });
            }
            dispatch(setAppCredential(credentials));
        },
        [dispatch, isRegistrationPage, login, registration],
    );
    const data = (errorRegistration as ApiErrorResponse)?.data;

    useEffect(() => {
        const state = location.state as LocationStateType;

        if (
            state?.from?.pathname === `${Paths.RESULT}/${Paths.ERROR}` &&
            isError &&
            !isFailedRegistration.current
        ) {
            onFinish(credential);
            isFailedRegistration.current = true;
        }
    }, [credential, isError, location.state, onFinish]);

    useEffect(() => {
        if (isSuccessRegistration) {
            dispatch(setAppIsError(false));
            navigate(`${Paths.RESULT}/${Paths.SUCCESS}`);
        }
        if (isErrorRegistration && data?.statusCode === HttpStatus.CONFLICT) {
            navigate(`${Paths.RESULT}/${Paths.ERROR_409}`);
        }
        if (isErrorRegistration && data?.statusCode !== HttpStatus.CONFLICT) {
            dispatch(setAppIsError(true));
            navigate(`${Paths.RESULT}/${Paths.ERROR}`);
        }
        if (isErrorLogin) {
            navigate(`${Paths.RESULT}/${Paths.ERROR_LOGIN}`);
        }
        if (isSuccessLogin) {
            localStorage.setItem(ACCESS_TOKEN_NAME, response?.accessToken ?? '');
            dispatch(setAccessToken(response?.accessToken ?? ''));
        }
    }, [
        data?.statusCode,
        dispatch,
        isErrorLogin,
        isErrorRegistration,
        isSuccessLogin,
        isSuccessRegistration,
        navigate,
        response?.accessToken,
    ]);

    return {
        onFinish,
        form,
    };
};
