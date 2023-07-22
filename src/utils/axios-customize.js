import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;
const instance = axios.create({
    baseURL,
});
function getTokenFromLocalStorage() {
    return localStorage.getItem("access_token");
}
function setAuthorizationHeader(config) {
    const token = getTokenFromLocalStorage();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}

instance.interceptors.request.use(setAuthorizationHeader, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;
