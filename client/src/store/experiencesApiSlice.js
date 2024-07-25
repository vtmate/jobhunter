import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const experiencesApiSlice = createApi({
  reducerPath: 'experiencesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Job'],
  endpoints: (builder) => ({
    sendExperienceData: builder.mutation({
      query: ({experiences}) => ({
        url: '/experiences',
        method: 'POST',
        body: experiences,
      }),
      invalidatesTags: ['Job'],
    }),
    getExpByUserId: builder.query({
      query: () => `/experiences`,
      transformResponse: ({ data }) => data,
      providesTags: ['Job'],
    }),
  }),
});

export const {
  useSendExperienceDataMutation,
  useGetExpByUserIdQuery
} = experiencesApiSlice;
