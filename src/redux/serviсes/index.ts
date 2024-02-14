import { mainBaseQuery } from '@redux/serviсes/base-query';
import { createApi } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: mainBaseQuery,
    endpoints: () => ({}),
});
