import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
    baseURL,
});

// const storage = localStorage.getItem('persist:auth') || null;

// const accessTokenJson = JSON.parse(storage);
// const accessToken = accessTokenJson
//     ? JSON.parse(accessTokenJson)?.auth.token.accessToken
//     : null;

// const accessToken =
//     JSON.parse(JSON.parse(localStorage.getItem('persist:auth'))?.auth).token ||
//     null;
// console.log(accessToken);
// axiosInstance.defaults.headers.common[
//     'Authorization'
// ] = `Bearer ${accessToken}`;

axiosInstance.interceptors.request.use(
    function (config) {
        const accessToken =
            JSON.parse(JSON.parse(localStorage.getItem('persist:auth'))?.auth)
                .token || null;
        config.headers.Authorization = `Bearer ${accessToken}`;
        // const tokenJson = JSON.parse(storage);
        // // const accessToken = tokenJson.auth.token.accessToken;
        // console.log('token', JSON.parse(tokenJson));
        // // config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error.response.data);
    }
);

export default axiosInstance;
