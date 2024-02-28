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
    [ProfileFieldNames.notifications]: boolean;
    [ProfileFieldNames.trainings]: boolean;
};

type Period = {
    text: string;
    cost: number;
    days: number;
};

export type Tarif = {
    _id: string;
    name: string;
    periods: Period[];
};

export const initialState = {
    credential: {} as ProfileCredential,
    pro: false,
    tarifs: [] as Tarif[],
    isLoaded: false,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileCredential(state, { payload: credential }: PayloadAction<ProfileCredential>) {
            state.credential = {
                ...state.credential,
                ...credential,
            };
        },
        setTarifs(state, { payload }: PayloadAction<Tarif[]>) {
            state.tarifs = payload;
        },
        setIsLoaded(state) {
            state.isLoaded = true;
        },
    },
});

export const profileCredentialSelector = (state: ApplicationState) => state.profile.credential;
export const profileIsLoadedSelector = (state: ApplicationState) => state.profile.isLoaded;
export const profileTarifs = (state: ApplicationState) => state.profile.tarifs;

export const { setProfileCredential, setIsLoaded, setTarifs } = profileSlice.actions;

export default profileSlice.reducer;
