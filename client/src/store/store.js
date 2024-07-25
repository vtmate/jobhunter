import { configureStore } from '@reduxjs/toolkit';
import { jobsApiSlice } from './jobsApiSlice';
import { authSlice } from './authSlice.js';
import { authApiSlice } from './authApiSlice.js';
import { applicationApiSlice } from './applicationApiSlice.js';
import { experiencesApiSlice } from './experiencesApiSlice.js';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [jobsApiSlice.reducerPath]: jobsApiSlice.reducer,
    [applicationApiSlice.reducerPath]: applicationApiSlice.reducer,
    [experiencesApiSlice.reducerPath]: experiencesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware, jobsApiSlice.middleware, applicationApiSlice.middleware, experiencesApiSlice.middleware),
});





// import { configureStore } from "@reduxjs/toolkit"
// // import { gameSlice } from "./gameSlice.js"
// // import {puzzleServerSlice} from "./puzzleServerSlice.js";
// // import {puzzleApiSlice} from "./puzzleApiSlice.js";
// import {authSlice} from "./authSlice.js";
// import {authApiSlice} from "./authApiSlice.js";

// export const store = configureStore({
//     reducer: {
//         // [gameSlice.name]: gameSlice.reducer,
//         // [puzzleServerSlice.name]: puzzleServerSlice.reducer,
//         // [puzzleApiSlice.reducerPath]: puzzleApiSlice.reducer,
//         [authSlice.name]: authSlice.reducer,
//         [authApiSlice.reducerPath]: authApiSlice.reducer,

//     },
//     middleware: (getDefaultMiddleware) => (
//         getDefaultMiddleware().concat(authApiSlice.middleware)
//         // getDefaultMiddleware().concat(puzzleApiSlice.middleware).concat(authApiSlice.middleware)
//     )

// })

