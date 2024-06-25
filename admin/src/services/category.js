import axiosInstance from './axiosConfig';

export const apiGetListCategory = (page = 1, searchText = '') =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                params: { page, searchText },
                method: 'GET',
                url: '/admin/category',
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const createNewCategory = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                method: 'POST',
                url: '/admin/category',
                data: payload,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const updateCategory = (categoryID, payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                // params: { id: adminID },
                method: 'PUT',
                url: `/admin/category/${categoryID}`,
                data: payload,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const deleteCategory = (categoryID) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                // params: { id: categoryID },
                method: 'DELETE',
                url: `/admin/category/${categoryID}`,
                // url: `/admin/manage/`,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
