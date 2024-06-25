import axiosInstance from './axiosConfig';

export const apiLogin = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                method: 'POST',
                url: '/admin/manage/login',
                data: payload,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
