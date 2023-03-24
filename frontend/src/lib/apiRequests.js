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

const uploadPhoto = (photo) => {
  const formData = new FormData();
  formData.append("photo", photo);
  return axios.post("/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
};

const updateUser = (username, name, pronouns, bio, pfp) => {
  return axios.put(`/api/user/${username}`, { name, pronouns, bio, pfp });
};

const sharePost = (images, caption) => {
  return axios.post("api/post", { images, caption });
};

const getComments = (postId) => {
  return axios.get(`api/comment?postId=${postId}`);
};

const postComment = (postId, comment) => {
  return axios.post("api/comment", { postId, comment });
};

export {
  registerUser,
  loginUser,
  getUser,
  getPosts,
  getFollowers,
  uploadPhoto,
  updateUser,
  sharePost,
  getComments,
  postComment,
};
