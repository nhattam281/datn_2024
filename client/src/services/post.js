import axiosInstance from './axiosConfig';

export const apiCreatePost = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                method: 'POST',
                url: '/post',
                data: payload,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiUpdatePost = (payload, postId) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                method: 'PUT',
                url: `/post/${postId}`,
                data: payload,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
export const apiGetPostRecommend = ({ amount = 2 }) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                params: { amount },
                method: 'GET',
                url: `/post/recommended`,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetPosts = (
    page = 1,
    searchText = '',
    categoryId = null,
    minPrice = null,
    maxPrice = null,
    minArea = null,
    maxArea = null,
    provinceId = null,
    districtId = null,
    wardId = null,
    orderBy = null,
    // orderBy = 'CREATED_DATE',
    orderDirection = null
    // orderDirection = 'asc', 'desc'
) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                params: {
                    page,
                    searchText,
                    categoryId,
                    minPrice,
                    maxPrice,
                    minArea,
                    maxArea,
                    provinceId,
                    districtId,
                    wardId,
                    orderBy,
                    orderDirection,
                },
                method: 'GET',
                url: '/post',
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetPostWithId = (postId) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                // params: { id: postId },
                method: 'GET',
                url: `/post/${postId}`,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetPostsSaved = (page = 1, searchText = '') =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                params: { page, searchText },
                method: 'GET',
                url: '/post-reaction/reacted-post',
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetMyPosts = (page = 1, searchText = '') =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                params: { page, searchText },
                method: 'GET',
                url: '/post/my-post',
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiDeleteMyPostWithId = (postId) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                // params: { id: postId },
                method: 'DELETE',
                url: `/post/${postId}`,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiSavePost = (postId) =>
    new Promise(async (resolve, reject) => {
        try {
            const data = {
                postId,
                type: 'LIKE',
            };
            const res = await axiosInstance({
                method: 'POST',
                url: '/post-reaction',
                data,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiUnSavePost = (postId) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axiosInstance({
                // params: { id: postId },
                method: 'DELETE',
                url: `/post-reaction/${postId}`,
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
