import { AuthFieldNames, ProfileFieldNames } from '@common-types/credentials';
import { ApplicationState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UploadFile } from 'antd';

export type ProfileAvatar = {
    file: UploadFile;
};

export type ProfileState = typeof initialState;
export type ProfileCredential = {
    [ProfileFieldNames.name]: string;
    [ProfileFieldNames.surname]: string;
    [ProfileFieldNames.birthday]: string;
    [AuthFieldNames.email]: string;
    [ProfileFieldNames.avatar]: string | ProfileAvatar;
};

export const initialState = {
    credential: {} as ProfileCredential,
    isLoaded: false,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileCredential(state, { payload: credential }: PayloadAction<ProfileCredential>) {
            state.credential = credential;
        },
        setIsLoaded(state) {
            state.isLoaded = true;
        },
    },
});

export const profileCredentialSelector = (state: ApplicationState) => state.profile.credential;
export const profileIsLoadedSelector = (state: ApplicationState) => state.profile.isLoaded;

export const { setProfileCredential, setIsLoaded } = profileSlice.actions;

export default profileSlice.reducer;
