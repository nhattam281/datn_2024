import axiosInstance from './axiosConfig';

export const apiGetCategory = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                method: 'GET',
                url: '/category',
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
