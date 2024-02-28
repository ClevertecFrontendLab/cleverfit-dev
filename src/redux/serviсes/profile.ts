import { ApiEndpoints } from '@redux/constants/api';
import { EndpointNames } from '@redux/constants/endpoint-names';
import { setAppAlert, setAppLoader } from '@redux/modules/app';
import {
    ProfileCredential,
    setIsLoaded,
    setProfileCredential,
    setTarifs,
    Tarif,
} from '@redux/modules/profile.ts';
import { resetStateCreating } from '@redux/modules/training';
import { apiSlice } from '@redux/serviсes/index';

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<ProfileCredential, void>({
            query: () => ({
                url: ApiEndpoints.CURRENT_USER,
                method: 'GET',
                name: EndpointNames.GET_USER,
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    const { data } = await queryFulfilled;

                    dispatch(setAppLoader(false));
                    dispatch(setProfileCredential(data));
                    dispatch(setIsLoaded());
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),

        updateUser: builder.mutation<ProfileCredential, Partial<ProfileCredential>>({
            query: (body) => ({
                url: ApiEndpoints.USER,
                method: 'PUT',
                name: EndpointNames.UPDATE_USER,
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(setProfileCredential(data));
                    dispatch(
                        setAppAlert({
                            message: 'Данные профиля успешно обновлены',
                            type: 'success',
                        }),
                    );

                    setTimeout(() => {
                        dispatch(
                            setAppAlert({
                                message: '',
                            }),
                        );
                    }, 1500);
                } catch {
                    dispatch(resetStateCreating());
                }
            },
        }),

        getTarifs: builder.query<Tarif[], void>({
            query: () => ({
                url: ApiEndpoints.TARIFS,
                method: 'GET',
                name: EndpointNames.GET_TARIFS,
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    const { data } = await queryFulfilled;

                    dispatch(setAppLoader(false));
                    dispatch(setTarifs(data));
                    dispatch(setIsLoaded());
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),
    }),
});
export const {
    useLazyGetUserQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useGetTarifsQuery,
    useLazyGetTarifsQuery,
} = profileApiSlice;
