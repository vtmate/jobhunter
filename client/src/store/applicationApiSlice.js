import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const applicationApiSlice = createApi({
  reducerPath: 'applicationApi',
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
    addApplication: builder.mutation({
      query: (newApplication) => ({
        url: '/applicants',
        method: 'POST',
        body: newApplication,
      }),
      invalidatesTags: ['Job'],
    }),
    getApplicantsByJobId: builder.query({
      query: (jobId) => {
        console.log('Fetching applicants for jobId:', jobId);
        return `/applicants?jobId=${jobId}`;
      },
      // transformResponse: ({ data }) => data,
      providesTags: ['Job'],
    }),
  }),
});

export const {
  useAddApplicationMutation,
  useGetApplicantsByJobIdQuery,
} = applicationApiSlice;
