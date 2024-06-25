import axiosInstance from './axiosConfig';

export const apiRegister = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                method: 'POST',
                url: '/auth/register',
                data: payload,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiLogin = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                method: 'POST',
                url: '/auth/login',
                data: payload,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
