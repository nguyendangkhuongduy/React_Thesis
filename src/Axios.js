import axios from "axios";
import userActions, {login, logout} from "core/user";
import {sleep} from "core/utils";

export const Axios = () => {
  axios.defaults.headers.get = {
    pragma: "no-cache",
    "cache-control": "no-cache",
  };

  axios.defaults.baseURL = process.env.DISPATCHER_SERVICE_ROOT_URL;

  axios.interceptors.request.use(
      (config) => {
        const {headers} = config;

        const {authorization} = headers;

        if (authorization === null) {
          delete headers.authorization;
        } else {
          headers.authorization =
              authorization || `Bearer ${userActions.get("token")}`;
        }

        config.headers["encrypted-data-token"] = userActions.get(
            "encryptedDataToken"
        );

        return config;
      },
      (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          const {status, statusText, data} = error.response;
          if (status === 401) {
            if (data && data.error && data.error === "ROLE_ACCESS_ERROR") {
              error.message = data.message;
              return Promise.reject(error);
            } else {
              //else token has expired
              await sleep(1000);
              logout();
              login();
            }
          } else {
            error.message = data.message || statusText;
            return Promise.reject(error);
          }
        } else if (error.request) {
          return Promise.reject(error);
        } else {
          return Promise.reject(error);
        }
      }
  );
};