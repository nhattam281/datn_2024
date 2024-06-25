import axiosInstance from './axiosConfig';

export const apiGetListAdmin = (page = 1, searchText = '') =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                params: { page, searchText, limit: 5 },
                method: 'GET',
                url: '/admin/manage',
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const createNewAdmin = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                method: 'POST',
                url: '/admin/manage',
                data: payload,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const updateAdmin = (adminID, payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                // params: { id: adminID },
                method: 'PUT',
                url: `/admin/manage/${adminID}`,
                data: payload,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const deleteAdmin = (adminID) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                // params: { id: adminID },
                method: 'DELETE',
                url: `/admin/manage/${adminID}`,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
