import axios from "axios";
import history from "~/utils/history";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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
    return err;
  }
);

export default api;
