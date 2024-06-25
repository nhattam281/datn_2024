import axiosInstance from './axiosConfig';

export const createFile = (file) =>
    new Promise(async (resolve, reject) => {
        try {
            const formData = new FormData();
            formData.set('file', file);
            const res = await axiosInstance.post('file', formData);
            console.log('res', res);
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
