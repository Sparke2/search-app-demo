import axios from "axios";

export const $api = axios.create({
    baseURL:'https://google.com/'
})

$api.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
            // config.headers["Access-Control-Allow-Credentials"] = true;
        }
        config.headers["Content-Type"] = "application/json";
        // config.credentials = "same-origin";
        // config.baseURL = baseURL;

        return config;
    },
     (error:unknown) => {
        return Promise.reject(error);
    }
);
