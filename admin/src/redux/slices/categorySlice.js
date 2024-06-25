import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGetListCategory } from '../../services/category';

const initialState = {
    errMsg: null,
    category: null,
    loading: false,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        // resetErrMsg: (state, action) => {
        //     state.errMsg = null;
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListCategory.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getListCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
                state.errMsg = null;
            })
            .addCase(getListCategory.rejected, (state, action) => {
                state.loading = false;
                state.category = null;
                state.errMsg = action.error;
            });
    },
});

export const getListCategory = createAsyncThunk(
    'admins/getListCategory',
    async ({ page = 1, searchText = '' }) => {
        const res = await apiGetListCategory(page, searchText);
        return res;
    }
);

export default categorySlice;
