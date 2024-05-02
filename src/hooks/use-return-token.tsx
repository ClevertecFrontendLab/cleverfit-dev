import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ACCESS_TOKEN_NAME } from '@constants/general';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { accessTokenSelector, setAccessToken, setIsLoadingAccessToken } from '@redux/modules/app';

export const useReturnToken = () => {
    const dispatch = useDispatch();
    const token = useAppSelector(accessTokenSelector);

    useLayoutEffect(() => {
        const isTokenAlive = localStorage.getItem(ACCESS_TOKEN_NAME);

        if (isTokenAlive) {
            dispatch(setAccessToken(isTokenAlive));
        }

        dispatch(setIsLoadingAccessToken());
    }, [dispatch]);

    return token;
};
