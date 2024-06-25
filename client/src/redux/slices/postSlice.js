import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    apiGetMyPosts,
    apiGetPostRecommend,
    apiGetPosts,
    apiGetPostsSaved,
    apiSavePost,
} from '../../services/post';

const initialState = {
    loading: false,
    posts: null,
    postsSaved: null,
    postRecommend: null,
    myPosts: null,
    errMsg: null,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearPostRecommend: (state, action) => {
            state.postRecommend = null;
            state.errMsg = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
                state.errMsg = null;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.loading = false;
                state.posts = null;
                state.errMsg = action.error;
            })
            .addCase(getAllPostSaved.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllPostSaved.fulfilled, (state, action) => {
                state.loading = false;
                state.postsSaved = action.payload;
                state.errMsg = null;
            })
            .addCase(getAllPostSaved.rejected, (state, action) => {
                state.loading = false;
                state.posts = null;
                state.errMsg = action.error;
            })
            .addCase(getMyPost.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getMyPost.fulfilled, (state, action) => {
                state.loading = false;
                state.myPosts = action.payload;
                state.errMsg = null;
            })
            .addCase(getMyPost.rejected, (state, action) => {
                state.loading = false;
                state.myPosts = null;
                state.errMsg = action.error;
            })
            .addCase(getPostRecommend.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getPostRecommend.fulfilled, (state, action) => {
                state.loading = false;
                state.postRecommend = action.payload;
                state.errMsg = null;
            })
            .addCase(getPostRecommend.rejected, (state, action) => {
                state.loading = false;
                state.postRecommend = null;
                state.errMsg = action.error;
            });
    },
});

export const getAllPosts = createAsyncThunk(
    'post/getAllPost',
    async ({
        page = 1,
        searchText = '',
        categoryId = null,
        minPrice = null,
        maxPrice = null,
        minArea = null,
        maxArea = null,
        provinceId = null,
        districtId = null,
        wardId = null,
        orderBy = null,
        orderDirection = null,
    }) => {
        const res = await apiGetPosts(
            page,
            searchText,
            categoryId,
            minPrice,
            maxPrice,
            minArea,
            maxArea,
            provinceId,
            districtId,
            wardId,
            orderBy,
            orderDirection
        );
        return res;
    }
);

export const getAllPostSaved = createAsyncThunk(
    'post/getAllPostSave',
    async ({ page = 1, searchText = '' }) => {
        const res = await apiGetPostsSaved(page, searchText);
        return res;
    }
);
export const getMyPost = createAsyncThunk(
    'post/getMyPosts',
    async ({ page = 1, searchText = '' }) => {
        const res = await apiGetMyPosts(page, searchText);
        return res;
    }
);

export const getPostRecommend = createAsyncThunk(
    'post/getRecommend',
    async ({ amount = 2 }) => {
        const res = await apiGetPostRecommend(amount);
        return res;
    }
);

export default postSlice;
