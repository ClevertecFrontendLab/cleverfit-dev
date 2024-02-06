import { CredentialsFeedbackType, CredentialsType } from '@common-types/credentials';
import { ApplicationState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = typeof initialState;

export const initialState = {
    isError: false,
    isLoading: false,
    accessToken: '',
    credential: {
        email: '',
        password: '',
        confirmPassword: '',
        remember: false,
    },
    credentialFeedback: {
        message: '',
        rating: 0,
    },
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
        clearStateOnLogout: () => initialState,
    },
});

export const appSelector = (state: ApplicationState) => state.app;
export const credentialSelector = (state: ApplicationState) => state.app.credential;
export const credentialFeedbackSelector = (state: ApplicationState) => state.app.credentialFeedback;
export const accessTokenSelector = (state: ApplicationState) => state.app.accessToken;
export const errorSelector = (state: ApplicationState) => state.app.isError;
export const {
    setAppLoader,
    setAppIsError,
    clearStateOnLogout,
    setAppCredential,
    setAppCredentialFeedback,
    setAccessToken,
} = appSlice.actions;

export default appSlice.reducer;
