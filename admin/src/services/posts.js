import axiosInstance from './axiosConfig';

export const apiGetListPost = (
    page = 1,
    searchText = '',
    userId = null,
    isBlock = false
) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                params: { page, searchText, limit: 5, userId, isBlock },
                method: 'GET',
                url: '/admin/post',
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiUpdatePost = (postId) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                // params: { page, searchText, limit: 5, userId, isBlock },
                method: 'POST',
                url: `/admin/post/${postId}/block`,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiUnBlockPost = (postId) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                // params: { page, searchText, limit: 5, userId, isBlock },
                method: 'POST',
                url: `/admin/post/${postId}/un-block`,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetPostById = (postId) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                // params: { page, searchText, limit: 5, userId, isBlock },
                method: 'GET',
                url: `/post/${postId}`,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
// export const apiDeletePost = (postId) =>
//     new Promise(async (resolve, reject) => {
//         try {
//             const res = await axiosInstance({
//                 // params: { page, searchText, limit: 5, userId, isBlock },
//                 method: 'DELETE',
//                 url: `/admin/post/${postId}`,
//             });
//             resolve(res);
//         } catch (error) {
//             reject(error);
//         }
//     });
