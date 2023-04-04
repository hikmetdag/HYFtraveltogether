import axios from "axios";

const baseUrl = `${process.env.BASE_SERVER_URL}/api`;

//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem("token"));

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    let refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
    if (
      refreshToken &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`${baseUrl}/auth/token`, { refreshToken: refreshToken })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", JSON.stringify(res.data.accessToken));
            localStorage.setItem(
              "refreshToken",
              JSON.stringify(res.data.refreshToken)
            );

            return axios(originalRequest);
          } else {
            return Promise.reject(error);
          }
        });
    }
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "invalid refreshToken"
    ) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

//functions to make api calls

const api = {
  signup: (body) => {
    return axios.post(`${baseUrl}/auth/create`, body);
  },
  login: (body) => {
    return axios.post(`${baseUrl}/auth/login`, body);
  },
  refreshToken: (body) => {
    return axios.post(`${baseUrl}/auth/token`, body);
  },
  createReview: (body) => {
    return axios.post(`${baseUrl}/review/createReview`, body);
  },
  profileMe: (body) => {
    return axios.post(`${baseUrl}/user/me`, body);
  },
  likedBy: (detailId, body) => {
    return axios.put(`${baseUrl}/review/update/${detailId}`, body);
  },
  commentBy: (detailId, body) => {
    return axios.put(`${baseUrl}/review/update/${detailId}`, body);
  },
};

export default api;
