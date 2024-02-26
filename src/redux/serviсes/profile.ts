import { ApiEndpoints } from '@redux/constants/api';
import { EndpointNames } from '@redux/constants/endpoint-names';
import { setAppAlert, setAppLoader } from '@redux/modules/app';
import { ProfileCredential, setIsLoaded, setProfileCredential } from '@redux/modules/profile.ts';
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

        updateUser: builder.mutation<ProfileCredential, ProfileCredential>({
            query: (body) => ({
                url: ApiEndpoints.USER,
                method: 'PUT',
                name: EndpointNames.UPDATE_USER,
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    const { data } = await queryFulfilled;

                    dispatch(setProfileCredential(data));
                    dispatch(setAppLoader(false));
                    dispatch(
                        setAppAlert({
                            message: 'Данные профиля успешно обновлены',
                            type: 'success',
                        }),
                    );
                } catch {
                    dispatch(resetStateCreating());
                    dispatch(setAppLoader(false));
                }
            },
        }),
    }),
});
export const { useLazyGetUserQuery, useGetUserQuery, useUpdateUserMutation } = profileApiSlice;
