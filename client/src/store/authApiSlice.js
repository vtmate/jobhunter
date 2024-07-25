import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
    reducerPath: "authApi",

    // baseQuery: fetchBaseQuery({
    //     baseUrl: 'http://localhost:3030',
    //     prepareHeaders: (headers, { getState }) => {
    //       const token = getState().auth.token;
    //       if (token) {
    //         headers.set('authorization', `Bearer ${token}`);
    //       }
      
    //       return headers;
    //     },
    // }),
    //erre végül nincsen szükségem itt

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3030",
    }),


    endpoints: (build) => ({
        login: build.mutation({
            query: (args) => ({
                url: "/authentication",
                method: "POST",
                body: {
                    ...args.body, strategy: "local",
                }
            })
        }),
        register: build.mutation({
            query: ({ body }) => ({
                url: '/users',
                method: 'POST',
                body,
            }),
        }),
        // getUser: build.query({
        //     query: (id) => `/users/${id}`,
        // }), //ezek az adatok már megtalálhatóak a store-ban
    })
})

export const {useLoginMutation, useRegisterMutation } = authApiSlice;