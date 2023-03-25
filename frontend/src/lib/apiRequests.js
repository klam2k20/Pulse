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

const postComment = (postId, comment, parentId) => {
  return axios.post("api/comment", { postId, comment, parentId });
};

const getPostLikes = (postId) => {
  return axios.get(`api/like?postId=${postId}`);
};

const addPostLike = (postId, userId) => {
  return axios.post("api/like", { postId, userId });
};

const removePostLike = (postId, userId) => {
  return axios.delete(`api/like?postId=${postId}&userId=${userId}`);
};

const addCommentLike = (postId, userId, parentId) => {
  console.log("add comment");
  console.log(postId);
  console.log(userId);
  console.log(parentId);
  return axios.post("api/like", { postId, userId, parentId });
};

const removeCommentLike = (postId, userId, commentId) => {
  return axios.delete(`api/like?postId=${postId}&userId=${userId}&parentId=${commentId}`);
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
  getPostLikes,
  addPostLike,
  removePostLike,
  addCommentLike,
  removeCommentLike,
};
