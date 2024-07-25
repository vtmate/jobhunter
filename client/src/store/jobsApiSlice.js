import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jobsApiSlice = createApi({
  reducerPath: 'jobsApi',
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
    getJobs: builder.query({
      query: () => '/jobs',
      transformResponse: ({ data }) => data,
      providesTags: ['Job'],
    }),
    getOneJob: builder.query({
      query: (id) => `/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Job', id }],
    }),
    addJob: builder.mutation({
      query: (newJob) => ({
        url: '/jobs',
        method: 'POST',
        body: newJob,
      }),
      invalidatesTags: ['Job'],
    }),
    getFilteredJobs: builder.query({
      query: (filters) => {
        const queryString = Object.entries(filters)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&');
        return `/jobs?${queryString}`;
      },
      transformResponse: ({ data }) => data,
    providesTags: ['Job'],
    }),
    getJobsByUserId: builder.query({
      query: (userId) => `/jobs?userId=${userId}`,
      transformResponse: ({ data }) => data,
      providesTags: ['Job'],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Job'],
    }),
    updateJob: builder.mutation({
      query: ({ id, ...updatedJob }) => ({
        url: `/jobs/${id}`,
        method: 'PATCH',
        body: updatedJob,
      }),
      invalidatesTags: ['Job'],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetOneJobQuery,
  useAddJobMutation,
  useGetFilteredJobsQuery,
  useGetJobsByUserIdQuery,
  useDeleteJobMutation,
  useUpdateJobMutation,
} = jobsApiSlice;
