import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGetListAdmin } from '../../services/admins';

const initialState = {
    loading: false,
    admins: null,
    errMsg: null,
};

const adminsSlice = createSlice({
    name: 'admins',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListAdmin.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getListAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.admins = action.payload;
                state.errMsg = null;
            })
            .addCase(getListAdmin.rejected, (state, action) => {
                state.loading = false;
                state.admins = null;
                state.errMsg = action.error;
            });
    },
});

export const getListAdmin = createAsyncThunk(
    'admins/getListAdmin',
    async ({ page = 1, searchText = '' }) => {
        const res = await apiGetListAdmin(page, searchText);
        return res;
    }
);

// export const createNewAdmin = createAsyncThunk(
//     'admins/createNewAdmin',
//     async () => {
//         const res = await apiGetListAdmin();
//         return res;
//     }
// );

export default adminsSlice;
