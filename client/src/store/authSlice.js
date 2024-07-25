import {createSlice} from "@reduxjs/toolkit";
import {authApiSlice} from "./authApiSlice.js";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null
    },
    reducers: {
        login: (state, {payload}) => {
            state.user = payload.user;
            state.token = payload.accessToken;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApiSlice.endpoints.login.matchFulfilled, (state, {payload}) => {
            state.user = payload.user;
            state.token = payload.accessToken;
        })
    },
    selectors: {
        selectIsAuthenticated: state => !!state.user,
    }
})


export const {login, logout} = authSlice.actions;
export const {selectIsAuthenticated} = authSlice.selectors;

export const user = (state) => state.auth.user;
export const token = (state) => state.auth.token;
