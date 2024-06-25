import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    apiCurrentUser,
    apiUpdateUserProfile,
} from '../../services/currentUser';

const initialState = {
    loading: false,
    currentUser: null,
    errMsg: null,
};

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        currentUserLogout: (state, action) => {
            state.currentUser = null;
            state.errMsg = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                state.errMsg = null;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.currentUser = null;
                state.errMsg = action.error;
            })
            .addCase(updateUserProfile.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                state.errMsg = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.currentUser = null;
                state.errMsg = action.error;
            });
    },
});

export const getCurrentUser = createAsyncThunk(
    'currentUser/getCurrentUser',
    async () => {
        const res = await apiCurrentUser();
        return res;
    }
);

export const updateUserProfile = createAsyncThunk(
    'currentUser/updateUserProfile',
    async (userUpdate) => {
        const res = await apiUpdateUserProfile(userUpdate);
        return res;
    }
);

export default currentUserSlice;
