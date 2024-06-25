import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiCurrentUser, apiUpdateUser } from '../../services/user';

const initialState = {
    loading: false,
    currentUser: null,
    errMsg: null,
};

const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        userLogout: (state, action) => {
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
    'currentUser/updateProfile',
    async (updateProfile) => {
        const res = await apiUpdateUser(updateProfile);
        return res;
    }
);

export default userSlice;
