import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: "http://localhost:3002",
    timeout: 5000,
    withCredentials: true,
  });

  // fetch(baseURL, { credentials: 'include' })

  // instance.defaults.headers.post["Content-Type"] =
  //   "application/x-www-form-urlencoded;charset=UTF-8";

  // instance.defaults.headers.post('Access-Control-Allow-Headers', ['mytoken','Content-Type'])
  
  instance.interceptors.request.use(
    (config) => {
      // const token = window.localStorage.token;
      // token && (config.headers.Authorization = token);
      return config;
      // return config;
    },
    (err) => {
      console.log(err);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      console.log(err);
    }
  );

  return instance(config);
}
