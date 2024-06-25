import axiosInstance from './axiosConfig';

export const apiGetListUser = (
    page = 1,
    searchText = '',
    userId = null,
    isBlock = false
) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                params: { page, searchText, limit: 5, userId, isBlock },
                method: 'GET',
                url: '/admin/user',
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiUpdateUser = (userID) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                // params: { page, searchText, limit: 5, userId, isBlock },
                method: 'POST',
                url: `/admin/user/${userID}/block`,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiUnBlockUser = (userID) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                // params: { page, searchText, limit: 5, userId, isBlock },
                method: 'POST',
                url: `/admin/user/${userID}/un-block`,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiDeleteUser = (userID) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                // params: { page, searchText, limit: 5, userId, isBlock },
                method: 'DELETE',
                url: `/admin/user/${userID}`,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
