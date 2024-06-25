import axiosInstance from './axiosConfig';

export const apiCurrentUser = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                method: 'GET',
                url: '/admin/manage/profile',
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiUpdateUserProfile = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                method: 'PUT',
                url: '/admin/manage/info',
                data: payload,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiUpdateUserPassword = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                method: 'PUT',
                url: '/admin/manage/my-password',
                data: payload,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
