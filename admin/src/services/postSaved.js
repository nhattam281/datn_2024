import axiosInstance from './axiosConfig';

export const apiGetListPostSaved = (page = 1, searchText = '', userId = null) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                params: { page, searchText, userId },
                method: 'GET',
                url: '/admin/post-reaction',
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
