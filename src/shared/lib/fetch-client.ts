import axios from "axios";

export const $api = axios.create({
    baseURL:'https://api.v2.search.ipr-smart.ru/'
})
$api.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
    },
     (error:unknown) => {
        return Promise.reject(error);
    }
);