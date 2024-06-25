import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGetListUser } from '../../services/users';

const initialState = {
    loading: false,
    users: null,
    usersBlocked: null,
    errMsg: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getListUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.usersBlocked = null;
                state.errMsg = null;
            })
            .addCase(getListUser.rejected, (state, action) => {
                state.loading = false;
                state.users = null;
                state.usersBlocked = null;
                state.errMsg = action.error;
            })
            .addCase(getListUserBlocked.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getListUserBlocked.fulfilled, (state, action) => {
                state.loading = false;
                state.users = null;
                state.usersBlocked = action.payload;
                state.errMsg = null;
            })
            .addCase(getListUserBlocked.rejected, (state, action) => {
                state.loading = false;
                state.users = null;
                state.usersBlocked = null;
                state.errMsg = action.error;
            });
    },
});

export const getListUser = createAsyncThunk(
    'admins/getListUser',
    async ({ page = 1, searchText = '', userId = null, isBlock = false }) => {
        const res = await apiGetListUser(page, searchText, userId, isBlock);
        return res;
    }
);

export const getListUserBlocked = createAsyncThunk(
    'admins/getListUserBlocked',
    async ({ page = 1, searchText = '', userId = null, isBlock = true }) => {
        const res = await apiGetListUser(page, searchText, userId, isBlock);
        return res;
    }
);

export default usersSlice;
