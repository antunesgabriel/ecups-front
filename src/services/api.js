import axios from "axios";
import history from "~/utils/history";

export const APIURL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: APIURL,
  crossDomain: true,
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    const { response } = err;

    if (
      response &&
      response.data.statusCode === 401 &&
      response.data.message === "Unauthorized"
    ) {
      history.push("/logout");
    }
    return Promise.reject(err);
  }
);

export default api;
