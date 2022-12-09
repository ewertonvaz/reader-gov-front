import axios from "axios";

const apiURLs = {
    development: "http://localhost:8080",
    production: "https://ecv-upload-server.cyclic.app"
};

const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });


api.interceptors.request.use((config) => {

  const loggedInUserJSON = localStorage.getItem("loggedInUser");

  const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');


  if (parseLoggedInUser.token) {

    config.headers = { Authorization: `Bearer ${parseLoggedInUser.token}` };
  }

  return config;
});

api.interceptors.response.use(

    response => response,

    error => {
      if (error.response.status === 401) {
        localStorage.removeItem("loggedInUser");
      }

      return Promise.reject(error)
    }
)

export default api;