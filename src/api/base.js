import axios from "axios";
import { authHeader } from "../helpers/authHelper";

export const API_PREFIX = "";
const BASE_URL =
  "https://9b83-2405-201-200d-1c68-89cc-bcd4-c2c0-6cc1.in.ngrok.io/hoconn/api/v1/";
const BASE_URL_LIVE =
  "https://9b83-2405-201-200d-1c68-89cc-bcd4-c2c0-6cc1.in.ngrok.io/hoconn/api/v1/";

const axiosApi = axios.create({
  baseURL: `${BASE_URL}/${API_PREFIX}`,
});

// const axiosMasterApi = axios.create({
//   baseURL: `${BASE_URL}/${API_PREFIX}`,
// });

export const axiosInstance = axiosApi;
// export const axiosMasterInstance = axiosMasterApi;

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { params: config, headers: authHeader() })
    .then((response) => response)
    .catch((error) => error.response);
}

export async function patch(url, data, config = {}) {
  return await axiosApi
    .patch(url, { ...data }, { ...config })
    .then((response) => response)
    .catch((error) => error.response);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config, headers: authHeader() })
    .then((response) => response)
    .catch((error) => error.response);
}

export async function noAuthPost(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response)
    .catch((error) => error.response);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response);
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config }).then((response) => response);
}

export function isSuccessResp(status) {
  //2xx Status Codes [Success]
  if (status >= 200 && status <= 299) {
    return true;
  }
  return false;
}
