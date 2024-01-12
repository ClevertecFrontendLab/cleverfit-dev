import { apiSlice } from '@redux/serviсes/index';
import { ApiEndpoints } from '@redux/constants/api';
import { ApiGroupNames } from '@redux/constants/api-group-names';
import { EndpointNames } from '@redux/constants/endpoint-names';
import { LoginRequestType, LoginResponseType } from '@redux/types/login';
import { setAppLoader } from '@redux/modules/app';

export const authExtendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponseType, LoginRequestType>({
            query: ({ email, password }) => ({
                url: ApiEndpoints.LOGIN,
                method: 'POST',
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.LOGIN,
                body: {
                    login: email,
                    password,
                },
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    await queryFulfilled;
                    dispatch(setAppLoader(false));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),

        registration: builder.mutation<void, LoginRequestType>({
            query: ({ email, password }) => ({
                url: ApiEndpoints.REGISTRATION,
                method: 'POST',
                apiGroupName: ApiGroupNames.AUTH,
                name: EndpointNames.REGISTRATION,
                body: {
                    login: email,
                    password,
                },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    await queryFulfilled;
                    dispatch(setAppLoader(false));
                } catch {
                    dispatch(setAppLoader(false));
                }
            },
        }),
    }),
});
export const { useLoginMutation, useRegistrationMutation } = authExtendedApiSlice;
