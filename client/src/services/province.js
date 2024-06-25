import axiosInstance from './axiosConfig';

export const apiProvince = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                params: { type: 'PROVINCE' },
                method: 'GET',
                url: '/province',
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiProvinceDistrict = (parentID, type) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                params: { parentId: parentID, type: type },
                method: 'GET',
                url: '/province',
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
