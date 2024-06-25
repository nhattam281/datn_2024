import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiLogin } from '../../services/auth';

const initialState = {
    isLoggin: false,
    token: null,
    errMsg: null,
    loading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetErrMsg: (state, action) => {
            state.errMsg = null;
        },
        logout: (state, action) => {
            state.isLoggin = false;
            state.token = null;
            state.errMsg = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authLogin.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggin = true;
                state.token = action.payload.accessToken;
                state.errMsg = null;
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.loading = false;
                state.isLoggin = false;
                state.token = null;
                state.errMsg = action.error;
            });
    },
});

export const authLogin = createAsyncThunk('auth/login', async (userLogin) => {
    const res = await apiLogin(userLogin);
    return res;
});

export default authSlice;
