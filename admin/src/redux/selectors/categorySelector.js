// import { createSelector } from '@reduxjs/toolkit';

export const categorySelector = (state) => state.category.category;
export const categoryLoadingSelector = (state) => state.category.loading;
export const categoryErrMsgSelector = (state) => state.category.errMsg;
