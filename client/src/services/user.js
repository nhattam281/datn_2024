import axiosInstance from './axiosConfig';

export const apiCurrentUser = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                method: 'GET',
                url: '/profile',
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiUpdateUser = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                method: 'PUT',
                url: '/profile',
                data: payload,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
