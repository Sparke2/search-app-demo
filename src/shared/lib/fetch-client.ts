import axios from "axios";
// базровый url - basUrl
export const $api = axios.create({
    baseURL:'https://google.com/'
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
