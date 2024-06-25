import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGetCategory } from '../../services/category';

const initialState = {
    loading: false,
    category: [],
    errMsg: null,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
                state.errMsg = null;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.loading = false;
                state.category = null;
                state.errMsg = action.error;
            });
    },
});

export const getCategory = createAsyncThunk(
    'category/getCategory',
    async () => {
        const res = await apiGetCategory();
        return res;
    }
);
export default categorySlice;
