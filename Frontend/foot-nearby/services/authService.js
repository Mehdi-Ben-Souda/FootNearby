import axios from "axios";

const API_URL = "http://localhost:3000/auth";

const authService = {
  login: (email, password) =>
    axios.post(`${API_URL}/login`, { email, password }),
  signup: (username, email, password) =>
    axios.post(`${API_URL}/register`, {username, email, password }),
  //resetPassword: (email) => axios.post(`${API_URL}/reset-password`, { email }),
};

export default authService;
