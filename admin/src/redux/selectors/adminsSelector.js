// import { createSelector } from '@reduxjs/toolkit';

export const adminsSelector = (state) => state.admins.admins;
export const adminsLoadingSelector = (state) => state.admins.loading;
export const adminsErrMsgSelector = (state) => state.admins.errMsg;
