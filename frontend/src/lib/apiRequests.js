import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_SERVER;
axios.defaults.withCredentials = true;

const registerUser = (name, username, email, password) => {
  return axios.post('/api/auth/register', { name, username, email, password });
};

const loginUser = (login, password) => {
  return axios.post('/api/auth/login', { login, password });
};

const getUser = (username) => {
  return axios.get(`/api/user/${username}`);
};

const getPosts = (username) => {
  return axios.get(`/api/post?username=${username}`);
};

const getFollowers = (username) => {
  return axios.get(`/api/follower?username=${username}`);
};

const uploadPhoto = (photo) => {
  const formData = new FormData();
  formData.append('photo', photo);
  return axios.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

const updateUser = (username, name, pronouns, bio, pfp) => {
  return axios.put(`/api/user/${username}`, { name, pronouns, bio, pfp });
};

const sharePost = (images, caption) => {
  return axios.post('api/post', { images, caption });
};

const getComments = (postId) => {
  return axios.get(`api/comment?postId=${postId}`);
};

const postComment = (postId, comment, parentId) => {
  return axios.post('api/comment', { postId, comment, parentId });
};

const getPostLikes = (postId) => {
  return axios.get(`api/like?postId=${postId}`);
};

const addPostLike = (postId) => {
  return axios.post('api/like', { postId });
};

const removePostLike = (postId) => {
  return axios.delete(`api/like?postId=${postId}`);
};

const addCommentLike = (postId, parentId) => {
  return axios.post('api/like', { postId, parentId });
};

const removeCommentLike = (postId, commentId) => {
  return axios.delete(`api/like?postId=${postId}&parentId=${commentId}`);
};

const getPost = (postId) => {
  return axios.get(`api/post/${postId}`);
};

const addFollowing = (username) => {
  return axios.post('api/follower', { username });
};

const removeFollowing = (username) => {
  return axios.delete(`api/follower?username=${username}`);
};

const removePost = (postId) => {
  return axios.delete(`api/post?id=${postId}`);
};

const removeComment = (commentId) => {
  return axios.delete(`api/comment?id=${commentId}`);
};

const updatePost = (postId, images, caption) => {
  return axios.put(`api/post/${postId}`, { images, caption });
};

const getNotifications = () => {
  return axios.get('/api/notification');
};

const updateNotifications = () => {
  return axios.put('/api/notification');
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
  getPost,
  addFollowing,
  removeFollowing,
  removePost,
  removeComment,
  updatePost,
  getNotifications,
  updateNotifications,
};
