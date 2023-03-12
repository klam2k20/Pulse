import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER;
axios.defaults.withCredentials = true;

const registerUser = (name, username, email, password) => {
  return axios.post("/api/auth/register", { name, username, email, password });
};

const getUser = () => {
  return axios.get("/api/user");
};

export { registerUser, getUser };
