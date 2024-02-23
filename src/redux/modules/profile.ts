import { AuthFieldNames, ProfileFieldNames } from '@common-types/credentials';
import { ApplicationState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProfileState = typeof initialState;
export type ProfileCredential = {
    [ProfileFieldNames.name]: string;
    [ProfileFieldNames.surname]: string;
    [ProfileFieldNames.birthday]: string;
    [AuthFieldNames.email]: string;
    [ProfileFieldNames.avatar]: string;
};

export const initialState = {
    credential: {} as ProfileCredential,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileCredential(state, { payload: credential }: PayloadAction<ProfileCredential>) {
            state.credential = credential;
        },
    },
});

export const profileCredentialSelector = (state: ApplicationState) => state.profile.credential;

export const { setProfileCredential } = profileSlice.actions;

export default profileSlice.reducer;
