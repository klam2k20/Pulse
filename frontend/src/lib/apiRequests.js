import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER;
axios.defaults.withCredentials = true;

const registerUser = (name, username, email, password) => {
  return axios.post("/api/auth/register", { name, username, email, password });
};

const loginUser = (login, password) => {
  return axios.post("/api/auth/login", { login, password });
};

const getUser = (username) => {
  return axios.get(`/api/user/${username}`);
};

const getPosts = (username) => {
  return axios.get(`/api/post/${username}`);
};

const getFollowers = (username) => {
  return axios.get(`/api/follower/${username}`);
};

export { registerUser, loginUser, getUser, getPosts, getFollowers };
