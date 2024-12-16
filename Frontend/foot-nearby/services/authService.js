import axios from "axios";

const API_URL = "http://192.168.0.114:3000/auth";

const authService = {
  login: async (email, password) => {
    try {
      const rsp = await axios.post(`${API_URL}/login`, { email, password });
      if (rsp.status != 200) {
        console.log("Error");
      } else {
        console.log('Login successful:', rsp.data);
        return rsp.data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }

  },
  signup: async (username, email, password) => {
    try {
      const rsp = await axios.post(`${API_URL}/register`, { username, email, password });
      if (rsp.status != 200) {
        console.log("Error");
      } else {
        console.log('Login successful:', rsp.data);
        return rsp.data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
    return
  },
  //resetPassword: (email) => axios.post(`${API_URL}/reset-password`, { email }),
};

export default authService;
