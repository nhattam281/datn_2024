import axiosInstance from './axiosConfig';

export const apiGetUserById = (userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                method: 'GET',
                url: `/admin/user/${userId}`,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
