import axios from "axios";

const apiURLs = {
  //development: "http://localhost:8080",
  development: "https://reader-gov-back.cyclic.app",
  production: "https://reader-gov-back.cyclic.app"
};

const api = axios.create({ 
  baseURL: apiURLs[process.env.NODE_ENV] || apiURLs["development"],
  //onUploadProgress: progressEvent => console.log(progressEvent.loaded) //callbak mostra o progresso do upload
});


api.interceptors.request.use((config) => {

  const loggedInUserJSON = localStorage.getItem("loggedInUser");

  const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');


  if (parseLoggedInUser.token) {

    config.headers = { Authorization: `Bearer ${parseLoggedInUser.token}` };
  }

  return config;
});

api.interceptors.response.use(
    response => { 
      // response.headers["access-control-allow-origin"] = "*";
      // console.log(response);
      return response;
    },
    error => {
      if (error.response.status === 401) {
        localStorage.removeItem("loggedInUser");
      }

      return Promise.reject(error)
    }
)

export default api;