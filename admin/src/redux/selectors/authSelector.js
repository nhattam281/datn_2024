// import { createSelector } from '@reduxjs/toolkit';

export const authErrorMsgSelector = (state) => state.auth.errMsg;
export const authLoadingSelector = (state) => state.auth.loading;
export const authIsLogginSelector = (state) => state.auth.isLoggin;
