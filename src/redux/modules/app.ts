import { CredentialsFeedbackType, CredentialsType } from '@common-types/credentials';
import { ApplicationState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertProps } from 'antd';

export type AppState = {
    isError: boolean;
    isLoading: boolean;
    isLoadingToken: boolean;
    accessToken: string;
    credential: CredentialsType;
    openLeftMenu: boolean;
    credentialFeedback: CredentialsFeedbackType;
    alert: AlertProps;
};

export const initialState = {
    isError: false,
    isLoading: false,
    isLoadingToken: true,
    accessToken: '',
    credential: {
        email: '',
        password: '',
        confirmPassword: '',
        remember: false,
    },
    openLeftMenu: false,
    credentialFeedback: {
        message: '',
        rating: 0,
    },
    alert: {} as AlertProps,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppIsError(state, { payload: isError }: PayloadAction<boolean>) {
            state.isError = isError;
        },
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
        setAppAlert(state, { payload }: PayloadAction<AlertProps>) {
            state.alert = { ...payload };
        },
        setAppCredential(state, { payload: credential }: PayloadAction<CredentialsType>) {
            state.credential = credential;
        },
        setAppCredentialFeedback(
            state,
            { payload: credentialFeedback }: PayloadAction<CredentialsFeedbackType>,
        ) {
            state.credentialFeedback = credentialFeedback;
        },
        setAccessToken(state, { payload: token }: PayloadAction<string>) {
            state.accessToken = token;
        },
        setIsLoadingAccessToken(state) {
            state.isLoadingToken = false;
        },
        clearStateOnLogout: () => initialState,
        setStateLeftMenu: (state) => {
            state.openLeftMenu = !state.openLeftMenu;
        },
    },
});

export const appSelector = (state: ApplicationState) => state.app;
export const credentialSelector = (state: ApplicationState) => state.app.credential;
export const credentialFeedbackSelector = (state: ApplicationState) => state.app.credentialFeedback;
export const accessTokenSelector = (state: ApplicationState) => state.app.accessToken;
export const isLoadingAccessTokenSelector = (state: ApplicationState) => state.app.isLoadingToken;
export const errorSelector = (state: ApplicationState) => state.app.isError;
export const alertSelector = (state: ApplicationState) => state.app.alert;

export const leftMenuSelector = (state: ApplicationState) => state.app.openLeftMenu;
export const {
    setAppLoader,
    setAppIsError,
    clearStateOnLogout,
    setAppCredential,
    setAccessToken,
    setIsLoadingAccessToken,
    setAppCredentialFeedback,
    setStateLeftMenu,
    setAppAlert,
} = appSlice.actions;

export default appSlice.reducer;
