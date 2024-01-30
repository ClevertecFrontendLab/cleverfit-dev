import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CredentialsFeedbackType } from '@common-types/credentials';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    credentialFeedbackSelector,
    errorSelector,
    setAppCredentialFeedback,
} from '@redux/modules/app';
import { useCreateFeedbackMutation } from '@redux/serviсes/feedback';
import { Form } from 'antd';

export const useCreateFeedback = () => {
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [formNewReview] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const credentialsFromState = useAppSelector(credentialFeedbackSelector);
    const { message, rating } = credentialsFromState;
    const isError = useAppSelector(errorSelector);

    const [
        createFeedback,
        { isError: isErrorFeedback, isSuccess: isSuccessFeedback, data: payload },
    ] = useCreateFeedbackMutation();

    const onFinish = useCallback(
        (credentials: CredentialsFeedbackType) => {
            const { message, rating } = { ...credentials };

            createFeedback({ message, rating });
            dispatch(setAppCredentialFeedback(credentials));
        },
        [createFeedback, dispatch],
    );

    useEffect(() => {
        switch (true) {
            case isErrorFeedback:
                console.log(1);
                setOpenErrorModal(true);
                // navigate(`${Paths.RESULT}/${Paths.ERROR_LOGIN}`, { state: { from: location } });
                break;

            case isSuccessFeedback:
                dispatch(setAppCredentialFeedback(payload));
                console.log(1);
                // navigate(Paths.AUTH);
                break;
            default:
                break;
        }
    }, [dispatch, isErrorFeedback, isSuccessFeedback, navigate, response]);

    console.log ('response', response)
    console.log ('isErrorFeedback', isErrorFeedback)

    return {
        onFinish,
        formNewReview,
        openErrorModal,
    };
};
