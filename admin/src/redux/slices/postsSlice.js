import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGetListPostSaved } from '../../services/postSaved';
import { apiGetListPost } from '../../services/posts';

const initialState = {
    loading: false,
    posts: null,
    postsSaved: null,
    postsRecommend: null,
    errMsg: null,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListPost.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getListPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
                state.errMsg = null;
            })
            .addCase(getListPost.rejected, (state, action) => {
                state.loading = false;
                state.posts = null;
                state.errMsg = action.error;
            })
            .addCase(getListPostSave.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getListPostSave.fulfilled, (state, action) => {
                state.loading = false;
                state.postsSaved = action.payload;
                state.errMsg = null;
            })
            .addCase(getListPostSave.rejected, (state, action) => {
                state.loading = false;
                state.postsSaved = null;
                state.errMsg = action.error;
            });
    },
});

export const getListPost = createAsyncThunk(
    'admins/getListPost',
    async ({ page = 1, searchText = '', userId = null, isBlock = false }) => {
        console.log(userId);
        const res = await apiGetListPost(page, searchText, userId, isBlock);
        return res;
    }
);
export const getListPostSave = createAsyncThunk(
    'admins/getListPostSave',
    async ({ page = 1, searchText = '', userId = null }) => {
        console.log(userId);
        const res = await apiGetListPostSaved(page, searchText, userId);
        return res;
    }
);

export default postsSlice;
