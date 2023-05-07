import axios from "axios";

export const endpoints = {
    users: "/users",
    faculty: "/faculty",
    roles: "/roles",
};

const axios_instance = axios.create({
    baseURL: "http://localhost:8080/",
});

const loadToken = () => {
    const token_data_string = localStorage.getItem('token-data');
    const token_data = JSON.parse(token_data_string);
    return token_data.data.token;
}

axios_instance.interceptors.request.use(
    (config) => {
      const {headers} = config;

      const {authorization} = headers;

      if (authorization === null) {
        delete headers.authorization;
      } else {
        headers.authorization =
            authorization || `Bearer ${loadToken()}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
);

axios_instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response) {
        const {status, statusText, data} = error.response;
        if (status === 401) {
            // handle 401
        } else {
          error.message = data;
          return Promise.reject(error);
        }
      } else if (error.request) {
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
);

export default axios_instance;