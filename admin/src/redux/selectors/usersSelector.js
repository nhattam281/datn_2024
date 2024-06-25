// import { createSelector } from '@reduxjs/toolkit';

export const usersSelector = (state) => state.users.users;
export const usersBlockedSelector = (state) => state.users.usersBlocked;
export const usersLoadingSelector = (state) => state.users.loading;
export const usersErrMsgSelector = (state) => state.users.errMsg;
