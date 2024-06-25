import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(
    function (config) {
        const accessToken =
            JSON.parse(JSON.parse(localStorage.getItem('persist:auth'))?.auth)
                .token || null;
        config.headers.Authorization = `Bearer ${accessToken}`;

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
