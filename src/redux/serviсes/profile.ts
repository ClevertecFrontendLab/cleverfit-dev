import { ApiEndpoints } from '@redux/constants/api';
import { EndpointNames } from '@redux/constants/endpoint-names';
import { setAppLoader } from '@redux/modules/app';
import { ProfileCredential, setProfileCredential } from '@redux/modules/profile.ts';
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
                body: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    birthday: body.birthday,
                    imgSrc: body.imgSrc,
                    email: body.email,
                },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setAppLoader(true));
                    const { data } = await queryFulfilled;

                    dispatch(setProfileCredential(data));
                    dispatch(setAppLoader(false));
                } catch {
                    dispatch(resetStateCreating());
                    dispatch(setAppLoader(false));
                }
            },
        }),

        createAvatar: builder.mutation<{ url: string }, FormData>({
            query: (data) => ({
                url: ApiEndpoints.IMAGE,
                method: 'POST',
                name: EndpointNames.UPLOAD_UMAGE,
                body: data,
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch {
                    dispatch(resetStateCreating());
                }
            },
        }),
    }),
});
export const {
    useLazyGetUserQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useCreateAvatarMutation,
} = profileApiSlice;
