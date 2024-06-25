// import { createSelector } from '@reduxjs/toolkit';

export const postsSelector = (state) => state.posts.posts;
export const postsSavedSelector = (state) => state.posts.postsSaved;
export const postsRecommendSelector = (state) => state.posts.postsRecommend;
export const postsLoadingSelector = (state) => state.posts.loading;
export const postsErrMsgSelector = (state) => state.posts.errMsg;
